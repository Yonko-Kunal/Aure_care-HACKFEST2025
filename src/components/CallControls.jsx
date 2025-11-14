"use client";

import { useState } from "react";
import { Mic, MicOff, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CallControls({ onChatOpen }) {
    const [isMuted, setIsMuted] = useState(false);

    const toggleMute = () => {
        setIsMuted(!isMuted);
        // Add your microphone toggle logic here
        console.log(isMuted ? "Microphone unmuted" : "Microphone muted");
    };

    const handleHangup = () => {
        // Add your hangup logic here
        console.log("Call ended");
    };

    return (
        <div className="w-full flex justify-center pb-8">
            <div className="flex items-center gap-4 rounded-full px-6 py-4">
                {/* Microphone Button */}
                <Button
                    variant={isMuted ? "destructive" : "default"}
                    size="icon"
                    className="h-14 w-14 rounded-full"
                    onClick={toggleMute}
                >
                    {isMuted ? (
                        <MicOff className="h-6 w-6" />
                    ) : (
                        <Mic className="h-6 w-6" />
                    )}
                </Button>

                {/* Chat Button */}
                <Button
                    variant="outline"
                    size="icon"
                    className="h-14 w-14 rounded-full"
                    onClick={onChatOpen}
                >
                    <MessageCircle className="h-6 w-6" />
                </Button>

                {/* Hangup Button */}
                <Button
                    variant="destructive"
                    size="icon"
                    className="h-14 w-14 rounded-full bg-red-600 hover:bg-red-700"
                    onClick={handleHangup}
                >
                    <Phone className="h-6 w-6 rotate-[135deg]" />
                </Button>
            </div>
        </div>
    );
}
