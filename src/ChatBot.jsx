import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Bot, User, AlertCircle, Loader2 } from 'lucide-react';

// ─── Config ───
const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

// ─── Typing Indicator ───
function TypingDots() {
  return (
    <div className="flex items-start gap-3">
      <div className="w-7 h-7 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/20">
        <Bot size={14} className="text-white" />
      </div>
      <div className="bg-gray-800/80 border border-gray-700/50 rounded-2xl rounded-tl-sm px-4 py-3">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}

// ─── Single Chat Message ───
function ChatMessage({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
          isUser
            ? 'bg-gradient-to-r from-violet-500 to-purple-600 shadow-violet-500/20'
            : 'bg-gradient-to-r from-cyan-500 to-blue-600 shadow-cyan-500/20'
        }`}
      >
        {isUser ? <User size={14} className="text-white" /> : <Bot size={14} className="text-white" />}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'bg-gradient-to-r from-violet-600/80 to-purple-600/80 text-white rounded-2xl rounded-tr-sm border border-violet-500/30'
            : 'bg-gray-800/80 text-gray-200 rounded-2xl rounded-tl-sm border border-gray-700/50'
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}

// ─── Suggested Questions (chips) ───
const SUGGESTIONS = [
  "What are Anurag's skills?",
  "Tell me about his projects",
  "What is his experience?",
  "How to contact Anurag?",
];

function SuggestionChips({ onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 px-1">
      {SUGGESTIONS.map((q) => (
        <button
          key={q}
          onClick={() => onSelect(q)}
          className="text-xs px-3 py-1.5 rounded-full border border-cyan-500/30 text-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/15 hover:border-cyan-500/60 transition-all duration-200"
        >
          {q}
        </button>
      ))}
    </div>
  );
}

// ─── Main ChatBot Component ───
export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hey there! I'm Anurag's AI portfolio assistant. Ask me anything about his skills, projects, experience, or education!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [remaining, setRemaining] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = useCallback(
    async (text) => {
      const trimmed = (text || input).trim();
      if (!trimmed || isLoading) return;

      setInput('');
      setError(null);

      // Add user message
      const userMsg = { role: 'user', content: trimmed };
      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      try {
        const res = await fetch(`${API_BASE}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: trimmed }),
        });

        const data = await res.json();

        if (!res.ok) {
          // Rate limit hit
          if (res.status === 429) {
            setError('Daily chat limit reached. Please try again tomorrow!');
            setRemaining(0);
          } else {
            setError(data?.detail?.message || 'Something went wrong. Please try again.');
          }
          setIsLoading(false);
          return;
        }

        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
        if (data.remaining !== undefined) setRemaining(data.remaining);
      } catch (err) {
        console.error('Chat error:', err);
        setError('Could not reach the server. Please check if the backend is running.');
      } finally {
        setIsLoading(false);
      }
    },
    [input, isLoading]
  );

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const showSuggestions = messages.length <= 1 && !isLoading;

  return (
    <>
      {/* ── Floating Toggle Button ── */}
      <button
        id="chatbot-toggle"
        onClick={() => setIsOpen((o) => !o)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 ${
          isOpen
            ? 'bg-gray-800 border border-gray-600 rotate-0'
            : 'bg-gradient-to-r from-cyan-500 to-blue-600 shadow-cyan-500/40 animate-pulse hover:animate-none'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X size={22} className="text-white" /> : <MessageCircle size={22} className="text-white" />}
      </button>

      {/* ── Chat Window ── */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] transition-all duration-300 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-90 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl shadow-black/40 flex flex-col overflow-hidden"
          style={{ height: '500px' }}
        >
          {/* ── Header ── */}
          <div className="px-5 py-4 bg-gradient-to-r from-gray-800/80 to-gray-900/80 border-b border-gray-700/50 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Bot size={18} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-white">Anurag's AI Assistant</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-gray-400">Online</span>
                {remaining !== null && (
                  <span className="text-xs text-gray-500 ml-2">
                    {remaining} msg{remaining !== 1 ? 's' : ''} left today
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* ── Messages ── */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
            {messages.map((msg, i) => (
              <ChatMessage key={i} message={msg} />
            ))}

            {isLoading && <TypingDots />}

            {error && (
              <div className="flex items-start gap-2 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400">
                <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {showSuggestions && (
              <SuggestionChips onSelect={(q) => sendMessage(q)} />
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ── Input ── */}
          <div className="px-4 py-3 border-t border-gray-700/50 bg-gray-800/30">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Anurag..."
                disabled={isLoading}
                className="flex-1 bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all disabled:opacity-50"
              />
              <button
                onClick={() => sendMessage()}
                disabled={isLoading || !input.trim()}
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white transition-all hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-40 disabled:hover:shadow-none hover:scale-105 active:scale-95"
              >
                {isLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Send size={16} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
