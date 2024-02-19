import type { TContractType } from '@genezio-sdk/ai-builder_us-east-1';
import type { LucideIcon } from 'lucide-react';
import type TPrompt from './prompt';

type TTemplate = {
  name: TContractType;
  icon: LucideIcon;
  predefinedPrompts: TPrompt[];
};

export default TTemplate;
