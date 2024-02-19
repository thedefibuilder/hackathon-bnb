import React from 'react';

import type TCreationStep from '@/types/creation-step';
import type TPrompt from '@/types/prompt';

import LoadingButton from '../../loading-button';
import { Textarea } from '../../ui/textarea';
import SectionContainer from '../container';
import SectionHeader from '../header';
import ContractCreationSteps from './contract-creation-steps';
import PredefinedPromptsDialog from './predefined-prompts-dialog';

type TPromptSectionProperties = {
  activeChainName: string;
  userPrompt: string;
  predefinedPrompts: TPrompt[];
  isGenerationLoading: boolean;
  creationSteps: TCreationStep[];
  setUserPrompt: React.Dispatch<React.SetStateAction<string>>;
  onGenerateClick: () => void;
};

export default function PromptSection({
  activeChainName,
  predefinedPrompts,
  userPrompt,
  isGenerationLoading,
  creationSteps,
  setUserPrompt,
  onGenerateClick
}: TPromptSectionProperties) {
  return (
    <SectionContainer>
      <SectionHeader>
        <div className='flex flex-col'>
          <h3 className='text-xl font-semibold md:text-2xl lg:text-3xl'>Describe Customisation</h3>
          <h4 className='text-base font-medium text-muted-foreground md:text-lg'>
            Choose customisation to add into your {activeChainName} project
          </h4>
        </div>

        {predefinedPrompts && predefinedPrompts.length > 0 ? (
          <PredefinedPromptsDialog
            predefinedPrompts={predefinedPrompts}
            setUserPrompt={setUserPrompt}
          />
        ) : null}
      </SectionHeader>

      <Textarea
        value={userPrompt}
        placeholder={
          predefinedPrompts && predefinedPrompts.length > 0
            ? `i. e. ${predefinedPrompts[0].content}`
            : `Type the customisations for your ${activeChainName} Smart Contract`
        }
        className='h-60 w-full resize-none rounded-3xl p-5 placeholder:italic'
        onChange={(event) => setUserPrompt(event.target.value)}
      />

      <div className='flex w-full flex-col items-center justify-center gap-y-5 md:flex-row md:items-start md:justify-between'>
        <LoadingButton
          isLoading={isGenerationLoading}
          loadingContent='Generating Smart Contract'
          defaultContent='Generate Smart Contract'
          disabled={isGenerationLoading}
          onClick={onGenerateClick}
          className='w-full md:w-auto'
        />

        <ContractCreationSteps steps={creationSteps} />
      </div>
    </SectionContainer>
  );
}
