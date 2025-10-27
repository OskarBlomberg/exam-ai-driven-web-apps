import {
  RunnableSequence,
  RunnablePassthrough,
} from "@langchain/core/runnables";
import { standalonePrompt, answerChatPrompt } from "../chatTemplates";
import { ChatOllama } from "@langchain/ollama";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { combineDocs } from "../../utils/combineDocs";
import { retrieveDocs } from "../../utils/setupRetriever";

const llm = new ChatOllama({
  model: "llama3.1:8b",
});

const standaloneChain = RunnableSequence.from([
  standalonePrompt,
  llm,
  new StringOutputParser(),
]);

const getAndCombineDocs = RunnableSequence.from([
  (prevResult) => prevResult.standaloneQuestion,
  retrieveDocs,
  combineDocs,
]);

export const chain = RunnableSequence.from([
  {
    standaloneQuestion: standaloneChain,
    originalInput: new RunnablePassthrough(),
  },
  // (prevResult) => console.log(prevResult),
  {
    context: getAndCombineDocs,
    userInput: ({ originalInput }) => originalInput.userInput,
    history: ({ originalInput }) => originalInput.history,
  },
  answerChatPrompt,
  llm,
]);
