import "./Message.scss";

export const Message = ({ role, content }) => {
  const isOwnMessage = role === "user";

  return (
    <article
      className={`message message--${isOwnMessage ? "user" : "assistant"}`}
    >
      <h2 className="message__sender">{isOwnMessage ? "användare" : "bot"}</h2>
      <p className="message__content">{content}</p>
    </article>
  );
};
