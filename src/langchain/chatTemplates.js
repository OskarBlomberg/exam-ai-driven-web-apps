import {
  ChatPromptTemplate,
  MessagesPlaceholder,
  PromptTemplate,
} from "@langchain/core/prompts";

const standaloneTemplate =
  "Given a question, convert it to a standalone question in Swedish. question: {userInput} standalone question:";

export const standalonePrompt = PromptTemplate.fromTemplate(standaloneTemplate);

export const cacheCheckTemplate = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are a friendly customer service bot for TechNova AB. You only answer questions that has an answer in provided context or history. You also quote the relevant passage from provided context. If the question is not related to TechNova or customer service, you politly tell the user that you are unequipped to answer that type of question. You always answer in the same language that user uses in the question. If you don't know the answer to the question, return the boolean false.
    context: {context}
    history: {history}
    question: {userInput}
    answer:
    `,
  ],
]);

export const answerChatPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are a friendly customer service bot for TechNova AB. You only answer questions that has an answer in provided context. You also quote the relevant passage from provided context. If the question is not related to TechNova or customer service, you politly tell the user that you are unequipped to answer that type of question. If you don't know the answer to a question, you truthfully say so and advise the user to email customer support at support@technova.se. You always answer in the same language that user uses in the question.
    context: {context}
    history: {history}
    question: {userInput}
    answer:
    `,
  ],
  new MessagesPlaceholder("history"),
  ["user", `{userInput}`],
]);
