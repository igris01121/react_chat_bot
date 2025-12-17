import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export default function Chat() {
  const [messages, setMessages] = useState<string[]>(["Welcome to the chat 👋"]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Fetch initial messages on mount
  useEffect(() => {
    axios
      .get(`${API_URL}/chat`)
      .then((res) => {
        if (res?.data?.messages) setMessages(res.data.messages);
      })
      .catch((err) => console.error("Error fetching messages:", err));
  }, []);

  // Focus input when messages update
  useEffect(() => {
    inputRef.current?.focus();
  }, [messages]);

  // Scroll to bottom when messages update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const messageText = input;
    setInput("");
    setLoading(true);

    const useMock = localStorage.getItem("REACT_APP_USE_MOCK") === "true";

    try {
      if (useMock) {
        // Mock mode: echo the message
        setMessages((prev) => [...prev, `You: ${messageText}`, `Bot: Echo: ${messageText}`]);
      } else {
        // Send to server
        const response = await axios.post(`${API_URL}/chat`, { text: messageText });

        if (response?.data?.messages) {
          // Use server-returned messages to avoid duplicates
          setMessages(response.data.messages);
        } else if (response?.data?.reply) {
          // Fallback if server only returns reply
          setMessages((prev) => [...prev, `You: ${messageText}`, `Bot: ${response.data.reply}`]);
        } else {
          // Fallback if server returns nothing useful
          setMessages((prev) => [...prev, `You: ${messageText}`, `Bot: Sorry, no response.`]);
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [...prev, `Bot: Sorry, something went wrong.`]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-xl h-[70vh] flex flex-col rounded-3xl shadow-2xl bg-slate-950/70 backdrop-blur border border-slate-800">
        <div className="px-6 py-4 border-b border-slate-800 text-slate-100 font-semibold tracking-wide">
          Live Chat
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm text-slate-100 shadow-md animate-fadeIn ${
                msg.startsWith("You:") ? "bg-indigo-600 self-end" : "bg-violet-600 self-start"
              }`}
            >
              {msg}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="p-4 border-t border-slate-800 flex gap-3">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message…"
            className="flex-1 rounded-xl bg-slate-900 text-slate-100 px-4 py-2 text-sm outline-none border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 transition"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition text-sm font-medium text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
