export default function MessageBubble({ message }) {
  return (
    <div
      className={`flex ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm
        ${
          message.role === "user"
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm"
        }`}
      >
        {message.parts?.map((part, i) => {
          if (part.type === "text") {
            return (
              <p key={i} className="leading-relaxed">
                {part.text}
              </p>
            );
          }
        })}
      </div>
    </div>
  );
}
