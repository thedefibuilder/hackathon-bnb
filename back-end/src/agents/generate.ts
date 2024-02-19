import { PineconeStore } from '@langchain/community/vectorstores/pinecone';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { Pinecone } from '@pinecone-database/pinecone';
import { Document } from 'langchain/document';

export async function generatorAgent(pineconeClinet: Pinecone) {
  const systemMsg =
    'Your function is to interpret user requests specifically for smart contract development in Solidity.' +
    ' You must generate FULL code exclusively, without any explanatory or conversational text and placeholder comments. ' +
    ' Use openzeppelin libraries if neccessary. Do not use SafeMath library and use pragma 0.8.19 everytime.';
  const contextMsg = 'Context: {context}';
  const userMsg = 'Request: Based on the provided example apply the following customization "{customization}"';

  const prompt = new ChatPromptTemplate({
    promptMessages: [
      SystemMessagePromptTemplate.fromTemplate(systemMsg),
      HumanMessagePromptTemplate.fromTemplate(contextMsg),
      HumanMessagePromptTemplate.fromTemplate(userMsg),
    ],
    inputVariables: ['context', 'customization'],
  });

  const pineconeStore = await PineconeStore.fromExistingIndex(new OpenAIEmbeddings(), {
    pineconeIndex: pineconeClinet.index('article'),
  });
  const pineconeRetriever = pineconeStore.asRetriever({ k: 5, searchType: 'mmr', verbose: false });

  const llm = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: 'gpt-4-1106-preview',
    temperature: 0.2,
    modelKwargs: { seed: 1337 },
    verbose: true,
  });

  const retrievalChain = RunnableSequence.from([
    {
      context: RunnableSequence.from([
        (input) => [input.example, input.customization].join(' '),
        pineconeRetriever,
        formatDocuments,
      ]),
      example: (input) => input.example,
      customization: (input) => input.customization,
    },
    prompt,
    llm,
    new StringOutputParser(),
  ]);

  return retrievalChain;
}

function formatDocuments(documents: Document[]) {
  return documents.map((doc) => doc.metadata.content).join('\n');
}
