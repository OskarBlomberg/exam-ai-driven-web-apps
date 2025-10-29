import { useState } from "react";
import { Message } from "./components/Message";
import { useChain } from "./langchain/chains/chains";

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [streamMsg, setStreamMsg] = useState(null);
  const [cachedInfo, setCachedInfo] = useState("");

  const handleSubmit = async (inputData) => {
    const userInput = await inputData.get("textinput");

    setIsLoading(true);

    setMessages((prev) => [...prev, { content: userInput, role: "user" }]);

    const result = await useChain(userInput, messages, cachedInfo);

    setCachedInfo(result.newCache);

    setMessages((prev) => [
      ...prev,
      { content: result.content, role: "assistant" },
    ]);

    setIsLoading(false);
  };

  const allMsgs = messages.map((message, index) => (
    <Message content={message.content} role={message.role} key={index} />
  ));

  return (
    <main className="chat">
      <h1>TechNova kundchat</h1>
      <section className="chat__messages">
        {allMsgs}
        {streamMsg && <Message content={streamMsg} role="assistant" />}
      </section>
      <form className="chat__form" action={handleSubmit}>
        <input
          className="chat__form__input"
          type="text"
          id="textinput"
          name="textinput"
          disabled={isLoading}
          autoFocus
          required
        />
        <button className="chat__form__btn" disabled={isLoading}>
          {isLoading ? "Laddar" : "Skicka"}
        </button>
      </form>
    </main>
  );
}

export default App;
