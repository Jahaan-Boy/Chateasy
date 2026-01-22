import { useState, useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { axiosInstance } from "../lib/axios";

function AIChatContainer() {
  const [messages, setMessages] = useState([
    { role: "system", content: "You are a helpful AI assistant." },
  ]);

  const [isThinking, setIsThinking] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  const typeText = (fullText, index) => {
    let i = 0;

    const interval = setInterval(() => {
      i++;

      setMessages((prev) => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          content: fullText.slice(0, i),
        };
        return updated;
      });

      if (i >= fullText.length) {
        clearInterval(interval);
      }
    }, 18); // typing speed
  };

  const handleSend = async (text) => {
    const userMsg = { role: "user", content: text };
    setMessages((p) => [...p, userMsg]);

    // 🤖 SHOW THINKING
    setIsThinking(true);

    try {
      const res = await axiosInstance.post("/ai/chat", {
        messages: [...messages, userMsg],
      });

      const aiIndex = messages.length + 1;

      // 🛑 STOP THINKING
      setIsThinking(false);

      // ➕ ADD EMPTY AI MESSAGE
      setMessages((p) => [
        ...p,
        { role: "assistant", content: "" },
      ]);

      // ✍️ TYPE RESPONSE
      typeText(res.data.reply, aiIndex);
    } catch {
      setIsThinking(false);
      setMessages((p) => [
        ...p,
        { role: "assistant", content: "AI error." },
      ]);
    }
  };

  return (
    <>
      <ChatHeader isAI />

      <div className="flex-1 px-6 py-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages
            .filter((m) => m.role !== "system")
            .map((msg, i) => (
              <div
                key={i}
                className={`chat ${
                  msg.role === "user" ? "chat-end" : "chat-start"
                }`}
              >
                <div
                  className={`chat-bubble max-w-xs md:max-w-md ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-cyan-500 to-emerald-500 text-white"
                      : "bg-slate-800 text-slate-200"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

          {/* 🤖 THINKING INDICATOR */}
          {isThinking && (
            <div className="chat chat-start">
              <div className="chat-bubble bg-slate-800 text-slate-400 flex items-center gap-2">
                <span>AI is thinking</span>
                <span className="animate-bounce">.</span>
                <span className="animate-bounce delay-150">.</span>
                <span className="animate-bounce delay-300">.</span>
              </div>
            </div>
          )}

          <div ref={endRef} />
        </div>
      </div>

      <MessageInput isAI onSend={handleSend} />
    </>
  );
}

export default AIChatContainer;
