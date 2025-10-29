import {
  ChatPromptTemplate,
  MessagesPlaceholder,
  PromptTemplate,
} from "@langchain/core/prompts";

/* Returns standalone question */
const standaloneTemplate =
  "Given a question, convert it to a standalone question in Swedish. question: {userInput} standalone question:";

export const standalonePrompt = PromptTemplate.fromTemplate(standaloneTemplate);

/* Returns answer OR false */
export const cacheCheckPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `Given a question, check if the provided context or history already contains the necessary information to answer it. If unsure, consider the information insufficient. Respond only in JSON as shown: {{ "useCache": true }} or {{ "useCache": false }}

    context: {context}
    history: {history}
    question: {standaloneQuestion}
    `,
  ],
  new MessagesPlaceholder("history"),
  ["user", `{userInput}`],
]);

/* Returns answer */
export const answerChatPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are a friendly customer service bot for TechNova AB. You only answer questions that has an answer in provided context. You also quote the relevant passage from provided context. If the question is not related to TechNova or customer service, you politly tell the user that you are unequipped to answer that type of question. If you don't know the answer to a question, you truthfully say so and advise the user to email customer support at support@technova.se. You always answer in the same language that user uses in the question.
    context: {context}
    question: {userInput}
    answer:
    `,
  ],
  new MessagesPlaceholder("history"),
  ["user", `{userInput}`],
]);
