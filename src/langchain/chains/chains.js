import {
  RunnableSequence,
  RunnablePassthrough,
  RunnableBranch,
} from "@langchain/core/runnables";
import {
  standalonePrompt,
  answerChatPrompt,
  cacheCheckPrompt,
} from "../chatTemplates";
import { ChatOllama } from "@langchain/ollama";
import {
  JsonOutputParser,
  StringOutputParser,
} from "@langchain/core/output_parsers";
import { combineDocs } from "../../utils/combineDocs";
import { retrieveDocs } from "../../utils/setupRetriever";

const llm = new ChatOllama({
  model: "llama3.1:8b",
  temperature: 0,
});

/* Returns standalone question as string */
const standaloneChain = RunnableSequence.from([
  standalonePrompt,
  llm,
  new StringOutputParser(),
]);

/* Returns chunks as one string */
const getAndCombineDocs = RunnableSequence.from([
  (prevResult) => prevResult.standaloneQuestion,
  retrieveDocs,
  combineDocs,
]);

/* FinalAnswer chain - return answer string */
const finalAnswerChain = RunnableSequence.from([
  answerChatPrompt,
  llm,
  new StringOutputParser(),
]);

/* FetchDocsChain (standalone => combine docs => llm-call, returns object) */
const fetchDocsAndAnswerChain = RunnableSequence.from([
  {
    standaloneQuestion: standaloneChain,
    originalInput: new RunnablePassthrough(),
  },
  {
    context: getAndCombineDocs,
    userInput: ({ originalInput }) => originalInput.userInput,
    history: ({ originalInput }) => originalInput.history,
  },
  {
    content: finalAnswerChain,
    context: ({ context }) => context,
  },
]);

/* Check cache chain - return boolean */
const checkCacheChain = RunnableSequence.from([
  cacheCheckPrompt,
  llm,
  new JsonOutputParser(),
]);

/* Fetch new context chain - return answer obj */
const fetchVectorsChain = RunnableSequence.from([
  {
    context: getAndCombineDocs,
    userInput: ({ userInput }) => userInput,
    history: ({ history }) => history,
  },
  {
    content: finalAnswerChain,
    context: ({ context }) => context,
  },
]);

/* Branch that checks if cache should be used */
const branch = RunnableBranch.from([
  [
    ({ useCache }) => useCache.useCache,
    { content: finalAnswerChain, context: ({ context }) => context },
  ],
  fetchVectorsChain,
]);

const branchChain = RunnableSequence.from([
  {
    standaloneQuestion: standaloneChain,
    originalInput: new RunnablePassthrough(),
  },

  {
    standaloneQuestion: ({ standaloneQuestion }) => standaloneQuestion,
    userInput: ({ originalInput }) => originalInput.userInput,
    context: ({ originalInput }) => originalInput.prevCache,
    history: ({ originalInput }) => originalInput.history,
  },
  {
    useCache: checkCacheChain,
    standaloneQuestion: ({ standaloneQuestion }) => standaloneQuestion,
    userInput: ({ userInput }) => userInput,
    context: ({ context }) => context,
    history: ({ history }) => history,
  },

  branch,
]);

/* Function for calling chain */
export const useChain = async (userInput, history, cached = "") => {
  const result = cached
    ? await branchChain.invoke({
        userInput,
        history,
        prevCache: cached,
      })
    : await fetchDocsAndAnswerChain.invoke({
        userInput,
        history,
      });

  return { content: result.content, newCache: result.context };
};
