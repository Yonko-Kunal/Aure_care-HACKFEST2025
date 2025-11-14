"use client";

import { useState } from "react";
import Avatar from "@/components/Avatar/Avatar";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { CallControls } from "@/components/CallControls";
import { ChatInterface } from "@/components/ChatInterface";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen w-full relative overflow-hidden">
        {!isChatOpen ? (
          <>
            {/* Avatar - normal state */}
            <div className="flex-1 flex items-end justify-center">
              <Avatar expression="concern" size={700} />
            </div>
            {/* Controls */}
            <CallControls onChatOpen={() => setIsChatOpen(true)} />
          </>
        ) : (
          <>
            {/* Avatar - chat state (fixed top right corner) */}
            <div className="fixed top-8 right-8 z-50 transition-all duration-300 pointer-events-none">
              <div style={{ width: "180px", height: "180px" }}>
                <Avatar expression="concern" size={180} />
              </div>
            </div>
            {/* Chat Interface */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <ChatInterface onClose={() => setIsChatOpen(false)} />
            </div>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
}
