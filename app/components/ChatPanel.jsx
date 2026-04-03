"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import MessageList from "./chat/MessageList";
import ChatInput from "./chat/ChatInput";

export default function ChatPanel({ isReady }) {
  const [userInput, setUserInput] = useState("");

  const { messages, sendMessage, status, error } = useChat({
    api: "/api/chat",
  });

  const isLoading = status === "streaming" || status === "submitted";

  const handleSend = () => {
    if (!userInput.trim()) return;
    sendMessage({ text: userInput });
    setUserInput("");
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <MessageList
        messages={messages}
        isLoading={isLoading}
        error={error?.message || error}
        isReady={isReady}
      />
      <ChatInput
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onSend={handleSend}
        isLoading={isLoading}
        isReady={isReady}
      />
    </div>
  );
}
