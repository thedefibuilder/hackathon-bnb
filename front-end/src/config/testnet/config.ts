import { compilerEndpoint, documentationLink, fileExtension } from '../base';
import templates from '../templates';
import { testnetChains } from './chains';

const testnetConfig = {
  chains: testnetChains.sort((a, b) => a.name.localeCompare(b.name)),
  templates,
  documentationLink,
  compilerEndpoint,
  fileExtension
};

export default testnetConfig;
