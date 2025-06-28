import React, { useState, useRef, useEffect } from "react";
import { gql, useLazyQuery, ApolloProvider } from "@apollo/client";
import { communityClient } from "../../utils/communityApolloClient";

const COMMUNITY_AI_QUERY = gql`
  query CommunityAIQuery($input: String!) {
    communityAIQuery(input: $input) {
      text
      retrievedPosts {
        title
        content
      }
    }
  }
`;

function ChatBotInner({ onBack }) {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: " Hello! How can I assist your community needs today?",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  const [fetchAIResponse, { data, loading, error }] =
    useLazyQuery(COMMUNITY_AI_QUERY);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    fetchAIResponse({ variables: { input } });
    setInput("");
  };

  useEffect(() => {
    if (data?.communityAIQuery?.text) {
      const botResponse = {
        sender: "bot",
        text: ` ${data.communityAIQuery.text}`,
      };
      setMessages((prev) => [...prev, botResponse]);
    }

    if (error) {
      const errorResponse = {
        sender: "bot",
        text: "Sorry, something went wrong. Please try again.",
      };
      setMessages((prev) => [...prev, errorResponse]);
    }
  }, [data, error]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="post-detail-card-wrapper">
      <div className="post-detail-card-shadow"></div>
      <div
        className="post-detail-card d-flex flex-column"
        style={{
          height: "calc(100vh - 180px)",
          maxHeight: "600px",
          backgroundColor: "#f7f7f5",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div />
          <button
            className="btn btn-link btn-sm p-0 back-link"
            onClick={onBack}
          >
            ← Back to Forum
          </button>
        </div>

        <div
          className="flex-grow-1 overflow-auto mb-3"
          style={{
            background: "#f7f7f5",
            padding: "1rem",
            borderRadius: "0.5rem",
            border: "1px solid #dee2e6",
          }}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-2 ${msg.sender === "user" ? "text-end" : "text-start"}`}
            >
              <div
                className={`d-inline-block px-3 py-2 rounded ${
                  msg.sender === "user" ? "bg-primary text-white" : "text-dark"
                }`}
                style={{
                  backgroundColor:
                    msg.sender === "bot" ? "transparent" : undefined,
                  border: msg.sender === "bot" ? "none" : undefined,
                  paddingLeft: msg.sender === "bot" ? 0 : undefined,
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>

        <div className="mt-auto">
          <label className="form-label field-label">Ask a Question</label>
          <div className="d-flex gap-2">
            <input
              type="text"
              className="form-control field-input"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{ backgroundColor: "#f7f7f5" }}
            />
            <button
              className="btn submit-btn"
              onClick={handleSend}
              disabled={loading}
            >
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AIChatBotPage({ onBack }) {
  return (
    <ApolloProvider client={communityClient}>
      <ChatBotInner onBack={onBack} />
    </ApolloProvider>
  );
}
