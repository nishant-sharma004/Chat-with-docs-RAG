"use client";

import { useState } from "react";
import Header from "./components/Header";
import UploadPanel from "./components/UploadPanel";
import ChatPanel from "./components/ChatPanel";

export default function Home() {
  const [isReady, setIsReady] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <div className="flex h-[calc(100vh-65px)]">
        <UploadPanel onUploadSuccess={() => setIsReady(true)} />
        <ChatPanel isReady={isReady} />
      </div>
    </main>
  );
}
