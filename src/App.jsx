import { useState } from "react";
import { Message } from "./components/Message";

// Ta emot fråga och göra om till standalone question
// Kolla om svaret finns i cache
// Om inte, hämta från databas

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [streamMsg, setStreamMsg] = useState(null);

  const allMsgs = messages.map((message, index) => (
    <Message content={message.content} role={message.role} key={index} />
  ));

  return (
    <main className="chat">
      <h1>Technova kundchat</h1>
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
