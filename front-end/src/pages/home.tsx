import React, { Suspense, useEffect, useState } from 'react';

import type TCreationStep from '@/types/creation-step';
import type TTemplate from '@/types/template';
import type { EIP1193Provider, PublicClient, WalletClient } from 'viem';

import { createPublicClient, createWalletClient, custom } from 'viem';
import { useAccount } from 'wagmi';

import stepBackground from '@/assets/images/step.svg';
import BorderedContainer from '@/components/bordered-container';
import IncompatibleChainDialog from '@/components/incompatible-chain-dialog';
import SuspenseFallback from '@/components/suspense-fallback';
import WalletStatus from '@/components/wallet-status';
import testnetConfig from '@/config/testnet/config';
import useContractWorkflow from '@/custom-hooks/use-contract-workflow';

const ChainSelectSection = React.lazy(
  () => import('@/components/sections/chain-select/chain-select-section')
);
const TemplatesSection = React.lazy(() => import('@/components/sections/templates'));
const PromptSection = React.lazy(() => import('@/components/sections/prompt/prompt-section'));
const AuditSection = React.lazy(() => import('@/components/sections/audit/audit-section'));
const CodeViewerSection = React.lazy(
  () => import('@/components/sections/code-viewer/code-viewer-section')
);

// eslint-disable-next-line sonarjs/cognitive-complexity
export default function HomePage() {
  const { chains, templates } = testnetConfig;

  const { isConnected: isWalletConnected } = useAccount();
  const [publicClient, setPublicClient] = useState<PublicClient | null>(null);
  const [walletClient, setWalletClient] = useState<WalletClient | null>(null);

  const [activeChain, setActiveChain] = useState(chains[0]);
  const [activeTemplate, setActiveTemplate] = useState(templates[0]);
  const [userPrompt, setUserPrompt] = useState('');

  const {
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
  } = useContractWorkflow();

  useEffect(() => {
    if (window.ethereum) {
      const publicClient = createPublicClient({
        chain: activeChain.network,
        transport: custom(window.ethereum as EIP1193Provider)
      });

      const walletClient = createWalletClient({
        chain: activeChain.network,
        transport: custom(window.ethereum as EIP1193Provider)
      });

      setPublicClient(publicClient);
      setWalletClient(walletClient);
    }
  }, [activeChain]);

  const isContractWorkflowLoading = isGenerating || isCompiling || isAuditing;

  const isContractWorkflowCompleted =
    (isGenerationError || isGenerationSuccess) &&
    (isCompilationError || isCompilationSuccess) &&
    (isAuditionError || isAuditionSuccess);

  const creationSteps: TCreationStep[] = [
    {
      number: 1,
      step: 'Generating',
      isLoading: isGenerating,
      isError: isGenerationError,
      isSuccess: isGenerationSuccess,
      isStepConnected: true
    },
    {
      number: 2,
      step: 'Compiling',
      isLoading: isCompiling,
      isError: isCompilationError,
      isSuccess: isCompilationSuccess,
      isStepConnected: true
    },
    {
      number: 3,
      step: 'Auditing',
      isLoading: isAuditing,
      isError: isAuditionError,
      isSuccess: isAuditionSuccess,
      isStepConnected: true
    },
    {
      number: 4,
      step: 'Completed',
      isLoading: false,
      isError: isGenerationError && isCompilationError && isAuditionError,
      isSuccess: isContractWorkflowCompleted,
      isStepConnected: false
    }
  ];

  if (!publicClient && !walletClient) {
    return <WalletStatus status='not-installed' />;
  }

  if (!isWalletConnected) {
    return <WalletStatus status='not-authenticated' />;
  }

  return (
    <div className='flex w-full max-w-[1140px] flex-col gap-y-5'>
      <IncompatibleChainDialog setActiveChain={setActiveChain} />

      <BorderedContainer
        className='bg-cover md:mt-16 md:bg-contain'
        style={{
          background: `url(${stepBackground}) no-repeat`
        }}
      >
        <Suspense fallback={<SuspenseFallback className='h-40' />}>
          <ChainSelectSection activeChain={activeChain} setActiveChain={setActiveChain} />
        </Suspense>
      </BorderedContainer>

      <BorderedContainer>
        <Suspense fallback={<SuspenseFallback />}>
          <TemplatesSection
            templates={templates}
            activeChainName={activeChain.name}
            activeTemplateName={activeTemplate.name}
            onActiveTemplateChange={(template: TTemplate) => {
              setUserPrompt('');
              setActiveTemplate(template);
            }}
          />
        </Suspense>

        <Suspense fallback={<SuspenseFallback />}>
          <PromptSection
            activeChainName={activeChain.name}
            predefinedPrompts={activeTemplate.predefinedPrompts}
            userPrompt={userPrompt}
            isGenerationLoading={isContractWorkflowLoading}
            creationSteps={creationSteps}
            setUserPrompt={setUserPrompt}
            onGenerateClick={() => initContractWorkflow(userPrompt, activeTemplate.name)}
          />
        </Suspense>
      </BorderedContainer>

      {isAuditionSuccess && audit ? (
        <BorderedContainer>
          <Suspense fallback={<SuspenseFallback />}>
            <AuditSection activeChainName={activeChain.name} audit={audit} />
          </Suspense>
        </BorderedContainer>
      ) : null}

      {publicClient && walletClient && contractCode ? (
        <BorderedContainer>
          <Suspense fallback={<SuspenseFallback />}>
            <CodeViewerSection
              publicClient={publicClient}
              walletClient={walletClient}
              activeChain={activeChain}
              smartContractCode={contractCode}
              contractArtifacts={isContractWorkflowCompleted ? contractArtifact : null}
            />
          </Suspense>
        </BorderedContainer>
      ) : null}
    </div>
  );
}
