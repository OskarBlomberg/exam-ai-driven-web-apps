import { useState } from "react";
import { Message } from "./components/Message";
import { chain } from "./langchain/chains/chains";

// Ta emot fråga och göra om till standalone question
// Kolla om svaret finns i cache
// Om inte, hämta från databas

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [streamMsg, setStreamMsg] = useState(null);

  const handleSubmit = async (FormData) => {
    const userInput = await FormData.get("textinput");

    setIsLoading(true);

    setMessages((prev) => [...prev, { content: userInput, role: "user" }]);

    const result = await chain.invoke({
      userInput: userInput,
      history: messages,
    });
    console.log(result);

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
