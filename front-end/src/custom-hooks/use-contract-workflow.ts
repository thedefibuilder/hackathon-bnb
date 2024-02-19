import type { TContractType } from '@genezio-sdk/bnb-builder_us-east-1';

import EReducerState from '@/constants/reducer-state';

import useContractAuditor from './use-contract-auditor';
import useContractCompiler from './use-contract-compiler';
import useContractGenerator from './use-contract-generator';

export default function useContractWorkflow() {
  const {
    isGenerating,
    isGenerationError,
    isGenerationSuccess,
    contractCode,
    generateContract,
    dispatchGenerateContract
  } = useContractGenerator();

  const {
    isCompiling,
    isCompilationError,
    isCompilationSuccess,
    contractArtifact,
    compileContract,
    dispatchCompileContract
  } = useContractCompiler();

  const {
    isAuditing,
    isAuditionError,
    isAuditionSuccess,
    audit,
    auditContract,
    dispatchAuditContract
  } = useContractAuditor();

  async function initContractWorkflow(userPrompt: string, activeTemplateName: string) {
    dispatchGenerateContract({
      state: EReducerState.reset,
      payload: null
    });

    dispatchCompileContract({
      state: EReducerState.reset,
      payload: null
    });

    dispatchAuditContract({
      state: EReducerState.reset,
      payload: null
    });

    let contractCode = await generateContract(userPrompt, activeTemplateName as TContractType);

    if (contractCode) {
      const fixedContractCode = await compileContract(contractCode);

      if (fixedContractCode && contractCode !== fixedContractCode) {
        contractCode = fixedContractCode;

        dispatchGenerateContract({
          state: EReducerState.success,
          payload: fixedContractCode
        });
      }
    }

    if (contractCode) {
      await auditContract(contractCode);
    }
  }

  return {
    isGenerating,
    isGenerationError,
    isGenerationSuccess,
    contractCode,
    isCompiling,
    isCompilationError,
    isCompilationSuccess,
    contractArtifact,
    isAuditing,
    isAuditionError,
    isAuditionSuccess,
    audit,
    initContractWorkflow
  };
}
