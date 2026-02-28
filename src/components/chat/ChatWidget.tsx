"use client";

// src/components/chat/ChatWidget.tsx
// Floating AI chat widget — works with [locale] routing

import { useState, useRef, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { WELCOME_MESSAGES, SUGGESTED_QUESTIONS } from "@/lib/chat-context";
import styles from "./ChatWidget.module.css";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const VALID_LOCALES = ["en", "bg", "tr", "ro", "de", "ua"];

export default function ChatWidget() {
  const params = useParams();
  const locale = VALID_LOCALES.includes(params?.locale as string)
    ? (params.locale as string)
    : "en";

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const welcomeMessage = WELCOME_MESSAGES[locale] || WELCOME_MESSAGES.en;
  const suggestions = SUGGESTED_QUESTIONS[locale] || SUGGESTED_QUESTIONS.en;

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when opening
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      setShowWelcome(false);
      const userMessage: Message = { role: "user", content: text.trim() };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInput("");
      setIsLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: updatedMessages, locale }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || "Failed to get response");
        }

        // Streaming response
        const reader = res.body?.getReader();
        if (!reader) throw new Error("No stream");

        const decoder = new TextDecoder();
        let assistantContent = "";

        setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          assistantContent += decoder.decode(value, { stream: true });

          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "assistant",
              content: assistantContent,
            };
            return updated;
          });
        }
      } catch (err: unknown) {
        const errorMsg =
          err instanceof Error ? err.message : "Something went wrong";
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `⚠️ ${errorMsg}` },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading, locale],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setShowWelcome(true);
  };

  // Simple bold formatting: **text** → <strong>text</strong>
  const formatMessage = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <>
      {/* Chat Bubble */}
      <button
        className={`${styles.bubble} ${isOpen ? styles.bubbleHidden : ""}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open chat"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
            fill="currentColor"
          />
        </svg>
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className={styles.panel}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <div className={styles.avatar}>UB</div>
              <div>
                <div className={styles.headerName}>UB Market Assistant</div>
                <div className={styles.headerStatus}>
                  {isLoading ? "Typing..." : "Online"}
                </div>
              </div>
            </div>
            <div className={styles.headerActions}>
              {messages.length > 0 && (
                <button
                  className={styles.clearBtn}
                  onClick={clearChat}
                  title="Clear chat"
                >
                  🗑
                </button>
              )}
              <button
                className={styles.closeBtn}
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className={styles.messages}>
            {/* Welcome message */}
            {showWelcome && (
              <div className={styles.welcomeBlock}>
                <div className={`${styles.message} ${styles.assistant}`}>
                  {welcomeMessage}
                </div>
                <div className={styles.suggestions}>
                  {suggestions.map((q, i) => (
                    <button
                      key={i}
                      className={styles.suggestionBtn}
                      onClick={() => sendMessage(q)}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat messages */}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`${styles.message} ${
                  msg.role === "user" ? styles.user : styles.assistant
                }`}
              >
                {msg.role === "assistant"
                  ? formatMessage(msg.content)
                  : msg.content}
                {msg.role === "assistant" &&
                  isLoading &&
                  i === messages.length - 1 &&
                  !msg.content && (
                    <span className={styles.typing}>
                      <span />
                      <span />
                      <span />
                    </span>
                  )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className={styles.inputArea}>
            <textarea
              ref={inputRef}
              className={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                locale === "bg"
                  ? "Въведете съобщение..."
                  : locale === "tr"
                    ? "Mesajınızı yazın..."
                    : locale === "de"
                      ? "Nachricht eingeben..."
                      : locale === "ro"
                        ? "Scrieți un mesaj..."
                        : locale === "ua"
                          ? "Введіть повідомлення..."
                          : "Type a message..."
              }
              rows={1}
              disabled={isLoading}
            />
            <button
              className={styles.sendBtn}
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              aria-label="Send"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M22 2L15 22L11 13L2 9L22 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>

          {/* Footer */}
          <div className={styles.footer}>Powered by AI</div>
        </div>
      )}
    </>
  );
}
