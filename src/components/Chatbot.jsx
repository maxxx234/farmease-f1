import React, { useState } from "react";
import axios from "axios";

export default function ChatWidget() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // Toggle chat window

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        messages: newMessages
      });
      const assistant = res.data.assistant;
      setMessages([...newMessages, assistant]);
      setInput("");
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const generateImage = async () => {
    const prompt = window.prompt("Enter image prompt:");
    if (!prompt) return;

    try {
      const res = await axios.post("http://localhost:5000/api/image", { prompt });
      const url = res.data.imageUrl;
      setMessages([...messages, { role: "image", content: url }]);
    } catch (err) {
      console.error("Image gen error", err);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: "50%",
          backgroundColor: "#4CAF50",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
          zIndex: 1000,
          color: "white",
          fontSize: 28,
        }}
      >
        💬
      </div>

      {/* Chat Window */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 90,
            right: 20,
            width: 350,
            maxWidth: "90vw",
            height: 500,
            maxHeight: "80vh",
            backgroundColor: "#fff",
            borderRadius: 12,
            boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            zIndex: 1000,
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "#4CAF50",
              color: "#fff",
              padding: "10px 16px",
              fontWeight: "bold",
              fontSize: 16,
              textAlign: "center",
            }}
          >
            Krishi Sakthi AI
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: 10,
              overflowY: "auto",
              backgroundColor: "#f5f5f5",
            }}
          >
            {messages.map((m, i) => (
              <div key={i} style={{ margin: "8px 0" }}>
                {m.role === "assistant" && (
                  <div
                    style={{
                      background: "#efefef",
                      padding: 8,
                      borderRadius: 8,
                      maxWidth: "80%",
                    }}
                  >
                    🤖 {m.content}
                  </div>
                )}
                {m.role === "user" && (
                  <div
                    style={{
                      textAlign: "right",
                      maxWidth: "80%",
                      marginLeft: "auto",
                      background: "#dcf8c6",
                      padding: 8,
                      borderRadius: 8,
                    }}
                  >
                    👤 {m.content}
                  </div>
                )}
                {m.role === "image" && (
                  <img
                    src={m.content}
                    alt="generated"
                    style={{
                      width: "100%",
                      borderRadius: 8,
                      marginTop: 4,
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: 10, display: "flex", gap: 8 }}>
            <textarea
              rows="2"
              style={{ flex: 1, resize: "none", borderRadius: 6, padding: 6 }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: 6,
                padding: "6px 12px",
                cursor: "pointer",
              }}
            >
              {loading ? "..." : "Send"}
            </button>
            <button
              onClick={generateImage}
              style={{
                backgroundColor: "#2196F3",
                color: "white",
                border: "none",
                borderRadius: 6,
                padding: "6px 12px",
                cursor: "pointer",
              }}
            >
              🖼
            </button>
          </div>
        </div>
      )}
    </>
  );
}
