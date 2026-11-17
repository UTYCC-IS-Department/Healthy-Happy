"use client";

import { Bot, Send, Sparkles, UserRound } from "lucide-react";
import { FormEvent, useMemo, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { AiChatMessages } from "@/i18n/message-types";
import type { ChatResponse, ChatSource } from "@/lib/ai-chat/types";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
  sources?: ChatSource[];
};

export default function ChatClient({ locale, messages }: { locale: Locale; messages: AiChatMessages }) {
  const [input, setInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const endpoint = "/api/ai-chat/";

  const maxLength = 1200;
  const canSubmit = useMemo(() => input.trim().length > 0 && input.length <= maxLength && !pending, [input, pending]);

  async function submitMessage(event?: FormEvent) {
    event?.preventDefault();
    const message = input.trim();
    if (!message) {
      setError(messages.errors.empty);
      return;
    }
    if (message.length > maxLength) {
      setError(messages.errors.tooLong);
      return;
    }

    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: "user", content: message };
    setChatMessages((current) => [...current, userMessage]);
    setInput("");
    setError(null);
    setPending(true);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, message }),
      });
      const data = (await response.json()) as ChatResponse;
      if (!data.ok) {
        setError(errorCopy(data.code));
        return;
      }
      setChatMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.answer,
          sources: data.sources,
        },
      ]);
    } catch {
      setError(messages.errors.unavailable);
    } finally {
      setPending(false);
      inputRef.current?.focus();
    }
  }

  function errorCopy(code: string) {
    if (code === "rate_limited") return messages.errors.rateLimited;
    if (code === "too_long") return messages.errors.tooLong;
    if (code === "unavailable") return messages.errors.unavailable;
    return messages.errors.unknown;
  }

  function useSuggestion(suggestion: string) {
    setInput(suggestion);
    setError(null);
    inputRef.current?.focus();
  }

  return (
    <div className="bg-[#f4f2eb] px-4 py-8 text-black sm:px-6 lg:px-8">
      <section className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="py-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#2dc100]/15 px-4 py-2 text-xs font-bold uppercase tracking-normal text-[#1f7a14]">
            <Sparkles className="size-4" />
            {messages.hero.eyebrow}
          </div>
          <h1 className="mt-5 max-w-xl text-3xl font-extrabold leading-tight text-black sm:text-4xl lg:text-5xl">
            {messages.hero.title}
          </h1>
          <p className="mt-4 max-w-xl text-sm font-medium leading-7 text-neutral-700 sm:text-base">
            {messages.hero.description}
          </p>

          <div className="mt-8" aria-label={messages.accessibility.suggestions}>
            <div className="flex flex-wrap gap-2">
              {messages.suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => useSuggestion(suggestion)}
                  className="rounded-full border border-black/10 bg-white px-4 py-2 text-left text-xs font-bold text-neutral-800 transition hover:border-[#2dc100] hover:text-[#1f7a14]"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>

        <section className="rounded-2xl bg-white shadow-sm ring-1 ring-black/10">
          <div className="border-b border-black/10 px-4 py-4 sm:px-5">
            <h2 className="text-lg font-extrabold text-black">{messages.panel.title}</h2>
            <p className="mt-1 text-xs font-semibold text-neutral-600">{messages.panel.subtitle}</p>
          </div>

          <div
            className="flex h-[460px] flex-col gap-4 overflow-y-auto px-4 py-5 sm:px-5"
            aria-label={messages.accessibility.conversation}
          >
            {chatMessages.length === 0 ? (
              <div className="flex min-h-full flex-col items-center justify-center text-center">
                <Bot className="mb-4 size-10 text-[#2dc100]" />
                <h3 className="text-base font-extrabold text-black">{messages.panel.emptyTitle}</h3>
                <p className="mt-2 max-w-sm text-sm font-medium leading-6 text-neutral-600">
                  {messages.panel.emptyDescription}
                </p>
              </div>
            ) : (
              chatMessages.map((message) => (
                <article
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-[#2dc100]/15 text-[#1f7a14]">
                      <Bot className="size-4" />
                    </span>
                  )}
                  <div
                    className={`max-w-[84%] rounded-2xl px-4 py-3 text-sm font-medium leading-7 ${
                      message.role === "user" ? "bg-[#2b303a] text-white" : "bg-[#f4f2eb] text-black"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    {message.sources && message.sources.length > 0 && (
                      <div className="mt-3 border-t border-black/10 pt-2 text-xs text-neutral-600">
                        <span className="font-bold">{messages.panel.sourcesLabel}: </span>
                        {message.sources.map((source) => source.title || messages.panel.sourceFallback).join(", ")}
                      </div>
                    )}
                  </div>
                  {message.role === "user" && (
                    <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-[#2b303a] text-white">
                      <UserRound className="size-4" />
                    </span>
                  )}
                </article>
              ))
            )}
            {pending && (
              <div className="flex items-center gap-3 text-sm font-bold text-neutral-600">
                <Bot className="size-5 text-[#2dc100]" />
                {messages.panel.sending}
              </div>
            )}
          </div>

          <form onSubmit={submitMessage} className="border-t border-black/10 p-4 sm:p-5">
            <label htmlFor="ai-chat-message" className="sr-only">
              {messages.panel.inputLabel}
            </label>
            <div className="flex gap-2">
              <textarea
                ref={inputRef}
                id="ai-chat-message"
                value={input}
                rows={2}
                maxLength={maxLength}
                onChange={(event) => {
                  setInput(event.target.value);
                  setError(null);
                }}
                placeholder={messages.panel.placeholder}
                className="min-h-12 flex-1 resize-none rounded-2xl bg-[#dadada] px-4 py-3 text-sm font-semibold text-black placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                type="submit"
                disabled={!canSubmit}
                className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-[#2dc100] text-white transition hover:bg-[#239a00] disabled:cursor-not-allowed disabled:bg-neutral-300"
                aria-label={pending ? messages.panel.sending : messages.panel.send}
              >
                <Send className="size-5" />
              </button>
            </div>
            {error && <p className="mt-2 text-sm font-bold text-[#b42318]">{error}</p>}
          </form>
        </section>
      </section>
    </div>
  );
}
