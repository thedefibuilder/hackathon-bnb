import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';

import { auditJsonSchema, auditorAgent } from './agents/audit';
import { buildResolverAgent } from './agents/build-resolve';
import { generatorAgent } from './agents/generate';
import { TBuildResponse, TContractType, TVulnerability } from './types';

dotenv.config();

export class LlmService {
  public devEnv = process.env.NODE_ENV === 'development';

  private trimCode(code: string) {
    const codeMatch = new RegExp(`\`\`\`solidity([\\s\\S]*?)\`\`\``, 'g').exec(code);
    return codeMatch ? codeMatch[1].trim() : code;
  }

  // TODO: Remove unused _contractType
  async callGeneratorLLM(customization: string, _contractType: TContractType): Promise<string> {
    if (this.devEnv) {
      return 'pragma solidity ^0.8.0;\n\ncontract MyContract {\n\n // Put a "}" here to solve compilation error\n';
    }

    const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY || '', environment: 'gcp-starter' });
    const generator = await generatorAgent(pinecone);
    const responseCode = await generator.invoke({
      customization,
    });

    return this.trimCode(responseCode);
  }

  async buildCode(smartContractCode: string): Promise<TBuildResponse> {
    const buildResponse = await fetch(`https://compiler-service.defibuilder.com/api/v1/solidity`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': process.env.X_API_KEY || '',
      },
      body: JSON.stringify({ code: smartContractCode }),
    });

    const responseData = (await buildResponse.json()) as TBuildResponse;

    return { ...responseData, code: smartContractCode };
  }

  async callAuditorLLM(code: string): Promise<TVulnerability[]> {
    if (this.devEnv) {
      return [
        {
          title: 'Vulnerability 1',
          description: 'Description of vulnerability 1',
          severity: 'Medium',
        },
      ];
    }

    const response = await auditorAgent().invoke({
      code: code,
    });

    return auditJsonSchema.parse(response).audits;
  }

  async callBuildResolverLLM(code: string, compilerError: string): Promise<string> {
    const newCode = await buildResolverAgent().invoke({ code, compilerError });

    return this.trimCode(newCode);
  }
}
