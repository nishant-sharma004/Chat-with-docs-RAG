import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import LoadingDots from "./LoadingDots";
import ErrorMessage from "./ErrorMessage";

export default function MessageList({ messages, isLoading, error, isReady }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {/* Empty State */}
      {messages.length === 0 && (
        <div
          className="h-full flex flex-col items-center
                        justify-center text-center text-gray-400"
        >
          <span className="text-6xl mb-4">🤖</span>
          <p className="text-lg font-medium text-gray-600">
            {isReady
              ? "Ask anything about your documents!"
              : "Upload documents first to start chatting"}
          </p>
          <p className="text-sm mt-2">
            {isReady
              ? "I will answer only from your uploaded docs"
              : "Upload PDFs or add URLs on the left"}
          </p>
        </div>
      )}

      {/* Messages */}
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}

      {/* Error */}
      <ErrorMessage error={error} />

      {/* Loading */}
      {isLoading && <LoadingDots />}

      <div ref={messagesEndRef} />
    </div>
  );
}
