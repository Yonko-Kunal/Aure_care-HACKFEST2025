"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mic } from "lucide-react";

export function ChatInterface({ onClose }) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const textareaRef = useRef(null);

    const handleSend = () => {
        if (message.trim()) {
            setMessages([...messages, { text: message, sender: "user" }]);
            setMessage("");
            // Add your send message logic here
            console.log("Message sent:", message);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    }, [message]);

    return (
        <div className="w-full h-full flex flex-col overflow-hidden relative">
            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden px-6 py-6 pb-32 space-y-3">
                {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        <p>Start a conversation...</p>
                    </div>
                ) : (
                    messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${msg.sender === "user" ? "justify-start" : "justify-end"}`}
                        >
                            <div
                                className={`inline-block max-w-[45%] min-w-[80px] rounded-2xl px-4 py-2.5 break-words overflow-wrap-anywhere ${msg.sender === "user"
                                    ? "bg-muted text-foreground"
                                    : "bg-primary text-primary-foreground"
                                    }`}
                                style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Chat Input Area - Sticky */}
            <div className="sticky bottom-0 border-t px-6 py-4 bg-background z-10">
                <div className="flex items-end gap-3 w-full bg-muted/30 rounded-2xl px-4 py-3 border border-white/10">
                    <Textarea
                        ref={textareaRef}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Type a message..."
                        className="flex-1 min-h-[40px] max-h-[120px] resize-none overflow-hidden border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
                        style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
                        rows={1}
                    />
                    <Button
                        size="icon"
                        onClick={handleSend}
                        className="h-10 w-10 shrink-0 rounded-xl"
                        disabled={!message.trim()}
                    >
                        <Send className="h-5 w-5" />
                    </Button>
                    <Button
                        size="icon"
                        variant="outline"
                        onClick={onClose}
                        className="h-10 w-10 shrink-0 rounded-xl"
                    >
                        <Mic className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
