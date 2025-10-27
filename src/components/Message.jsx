export const Message = ({ role, content }) => {
  const isOwnMessage = role === "user";

  return (
    <article
      className={`message message--${isOwnMessage ? "user" : "assistant"}`}
    >
      <h2 className="message__sender">{role}</h2>
      <p className="message__content">{content}</p>
    </article>
  );
};
