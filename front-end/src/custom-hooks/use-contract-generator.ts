import { useReducer } from 'react';

import type { TContractType } from '@genezio-sdk/bnb-builder_us-east-1';

import { LlmService } from '@genezio-sdk/bnb-builder_us-east-1';

import EReducerState from '@/constants/reducer-state';
import {
  generateContractInitialState,
  generateContractReducer
} from '@/reducers/generate-contract';

export default function useContractGenerator() {
  const [generateContractState, dispatchGenerateContract] = useReducer(
    generateContractReducer,
    generateContractInitialState
  );

  async function generateContract(prompt: string, templateName: TContractType) {
    try {
      dispatchGenerateContract({
        state: EReducerState.start,
        payload: null
      });

      const contractCode = await LlmService.callGeneratorLLM(prompt, templateName);

      if (contractCode === null || contractCode === undefined || typeof contractCode !== 'string') {
        dispatchGenerateContract({
          state: EReducerState.error,
          payload: null
        });

        console.error('LLM ERROR CONTRACT GENERATOR');

        return null;
      }

      dispatchGenerateContract({
        state: EReducerState.success,
        payload: contractCode
      });

      return contractCode;
    } catch (error: unknown) {
      dispatchGenerateContract({
        state: EReducerState.error,
        payload: null
      });

      console.error('CATCH ERROR CONTRACT GENERATOR', error);

      return null;
    }
  }

  return {
    isGenerating: generateContractState.isLoading,
    isGenerationError: generateContractState.isLoading,
    isGenerationSuccess: generateContractState.isSuccess,
    contractCode: generateContractState.contractCode,
    generateContract,
    dispatchGenerateContract
  };
}
