export type TArtifact = {
  abi: unknown[];
  bytecode: string;
};

export type TBuildResponse = {
  success: boolean;
  message: string;
  artifact: TArtifact;
  code: string;
};

export type TVulnerability = {
  title: string;
  description: string;
  severity: TVulnerabilitySeverity;
};

export type TVulnerabilitySeverity = 'High' | 'Medium' | 'Low';

export type TContractType = 'Token' | 'NFT' | 'Edition' | 'Vault' | 'Marketplace' | 'Exchange';
