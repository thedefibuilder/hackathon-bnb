import type { Abi, Hex } from 'viem';

type TArtifact = {
  abi: Abi;
  bytecode: Hex;
};

export default TArtifact;
