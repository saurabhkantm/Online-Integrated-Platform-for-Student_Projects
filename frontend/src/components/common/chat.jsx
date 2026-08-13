import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]); // [{ role, text }]
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

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

        console.log("Sending message to backend:", userMsg.text, "with history:", history, api);

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
            console.log("Received response from backend:", data);
            if (data.success) {
                setMessages([...newMessages, { role: "model", text: data.reply }]);
            } else {
                setMessages([...newMessages, { role: "model", text: "Something went wrong. Please try again." }]);
            }
        } catch (err) {
            console.log("Chat error:", err.response?.data || err.message);
            setMessages([...newMessages, { role: "model", text: "Network error. Please try again." }]);
        }finally {
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
        <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
            {open ? (
                <div style={{ width: 340, height: 460, background: "#fff", borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column" }}>
                    <div style={{ padding: 12, borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <strong>Help Assistant</strong>
                        <button onClick={() => setOpen(false)}>✕</button>
                    </div>

                    <div style={{ flex: 1, overflowY: "auto", padding: 12 }}>
                        {messages.length === 0 && (
                            <p style={{ color: "#888", fontSize: 14 }}>
                                Ask me about submitting projects, plagiarism checks, faculty review, or anything else about the platform.
                            </p>
                        )}
                        {messages.map((m, i) => (
                            <div key={i} style={{ marginBottom: 8, textAlign: m.role === "user" ? "right" : "left" }}>
                                <span style={{
                                    display: "inline-block",
                                    padding: "6px 10px",
                                    borderRadius: 8,
                                    background: m.role === "user" ? "#dbeafe" : "#f3f4f6",
                                    maxWidth: "80%",
                                    fontSize: 14,
                                }}>
                                    {m.text}
                                </span>
                            </div>
                        ))}
                        {loading && <p style={{ fontSize: 13, color: "#888" }}>Typing…</p>}
                        <div ref={bottomRef} />
                    </div>

                    <div style={{ padding: 8, borderTop: "1px solid #eee", display: "flex", gap: 6 }}>
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type a message…"
                            style={{ flex: 1, padding: 8, borderRadius: 6, border: "1px solid #ddd" }}
                        />
                        <button onClick={sendMessage} disabled={loading}>Send</button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setOpen(true)}
                    style={{ borderRadius: "50%", width: 56, height: 56, background: "#2563eb", color: "#fff", border: "none", fontSize: 24 }}
                >
                    💬
                </button>
            )}
        </div>
    );
}