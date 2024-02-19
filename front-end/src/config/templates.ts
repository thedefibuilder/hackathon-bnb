import type TTemplate from '@/types/template';

import { BadgeCent, BookHeart, Brush, Coins, Store, Vault } from 'lucide-react';

import {
  predefinedEditionPrompts,
  predefinedExchangePrompts,
  predefinedMarketplacePrompts,
  predefinedNftPrompts,
  predefinedTokenPrompts,
  predefinedVaultPrompts
} from './predefined-prompts';

const templates: TTemplate[] = [
  {
    name: 'Token',
    icon: BadgeCent,
    predefinedPrompts: predefinedTokenPrompts
  },
  {
    name: 'NFT',
    icon: Brush,
    predefinedPrompts: predefinedNftPrompts
  },
  {
    name: 'Edition',
    icon: BookHeart,
    predefinedPrompts: predefinedEditionPrompts
  },
  {
    name: 'Vault',
    icon: Vault,
    predefinedPrompts: predefinedVaultPrompts
  },
  {
    name: 'Marketplace',
    icon: Store,
    predefinedPrompts: predefinedMarketplacePrompts
  },
  {
    name: 'Exchange',
    icon: Coins,
    predefinedPrompts: predefinedExchangePrompts
  }
];

export default templates;
