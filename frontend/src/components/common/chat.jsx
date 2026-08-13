import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", text: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    // Convert to Gemini history format
    const history = messages.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    const api = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_URL,
    });

    api.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    try {
      const res = await api.post("/api/chat/send", {
        message: userMsg.text,
        history,
      });
      const data = res.data;
      if (data.success) {
        setMessages([...newMessages, { role: "model", text: data.reply }]);
      } else {
        setMessages([...newMessages, { role: "model", text: "Something went wrong. Please try again." }]);
      }
    } catch (err) {
      console.log("Chat error:", err.response?.data || err.message);
      setMessages([...newMessages, { role: "model", text: "Network error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[1000]">
      {open ? (
        <div className="w-[360px] h-[500px] bg-[#F7F5F0] rounded-2xl border border-[#E2E4EA] shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-[#1B2340] shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#F0A868]/20 flex items-center justify-center">
                <Sparkles size={15} className="text-[#F0A868]" />
              </div>
              <div>
                <p className="font-serif text-sm text-white leading-none">Help Assistant</p>
                <p className="text-[10px] text-white/50 mt-0.5">Ask me anything</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-7 h-7 flex items-center justify-center rounded-full text-white/60 hover:bg-white/10 hover:text-white transition-colors duration-200"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center py-6">
                <div className="mx-auto mb-3 w-10 h-10 rounded-full bg-[#1B2340]/5 flex items-center justify-center">
                  <MessageCircle size={16} className="text-[#9CA3AF]" />
                </div>
                <p className="text-xs text-[#6B7280] leading-relaxed max-w-[220px] mx-auto">
                  Ask me about submitting projects, plagiarism checks, faculty review, or anything else about the platform.
                </p>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <span
                  className={`inline-block px-3.5 py-2 rounded-2xl text-xs leading-relaxed max-w-[80%] ${
                    m.role === "user"
                      ? "bg-[#1B2340] text-white rounded-br-sm"
                      : "bg-white border border-[#E2E4EA] text-[#1B2340] rounded-bl-sm"
                  }`}
                >
                  {m.text}
                </span>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <span className="inline-flex items-center gap-1 px-3.5 py-2.5 rounded-2xl rounded-bl-sm bg-white border border-[#E2E4EA]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9CA3AF] animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9CA3AF] animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9CA3AF] animate-bounce" />
                </span>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-3 py-3 border-t border-[#E2E4EA] bg-white shrink-0">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 px-3.5 py-2.5 rounded-full border border-[#E2E4EA] bg-[#F7F5F0] text-sm text-[#1B2340] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1B2340]/15 focus:border-[#1B2340] transition"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="w-9 h-9 shrink-0 flex items-center justify-center rounded-full bg-[#F0A868] text-[#1B2340] hover:bg-[#EC9B52] disabled:opacity-40 disabled:hover:bg-[#F0A868] transition-colors duration-200"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open help assistant"
          className="w-14 h-14 rounded-full bg-[#1B2340] text-[#F0A868] shadow-xl hover:bg-[#232B4D] hover:scale-105 transition-all duration-200 flex items-center justify-center"
        >
          <MessageCircle size={22} />
        </button>
      )}
    </div>
  );
}