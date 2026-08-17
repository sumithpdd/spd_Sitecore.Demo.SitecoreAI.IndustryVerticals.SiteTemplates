'use client';

import { FormEvent, JSX, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { MessageCircle, Send, Sparkles, X } from 'lucide-react';
import { answerChat, SUGGESTED_PROMPTS, type ChatSource } from 'lib/chat-knowledge';
import { recordSearchEvent } from '@/lib/cdp/cdp-session-tracker';

type ChatRole = 'user' | 'assistant';

type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
  sources?: ChatSource[];
};

/**
 * Pull-up Sitecore Search assistant. Students chat with University from the bottom-left of every page.
 */
export default function AiChatbot(): JSX.Element {
  const router = useRouter();
  const listRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Hi — I search University content (courses, Clearing, accommodation). Pick a question or type your own.',
    },
  ]);

  useEffect(() => {
    if (!router.isReady) return;
    const params = new URLSearchParams(router.asPath.split('?')[1] || '');
    if (params.get('utm_source')?.toLowerCase() === 'chatgpt') {
      setOpen(true);
    }
  }, [router.isReady, router.asPath]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, busy, open]);

  const ask = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed || busy) return;

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setBusy(true);
    recordSearchEvent(trimmed, 'chatbot');

    window.setTimeout(() => {
      const answer = answerChat(trimmed);
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          text: answer.text,
          sources: answer.sources,
        },
      ]);
      setBusy(false);
    }, 700);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    ask(input);
  };

  return (
    <div className={open ? 'ai-chatbot is-open' : 'ai-chatbot'}>
      <div
        className="ai-chatbot__panel"
        role="dialog"
        aria-label="Chat with University"
        aria-hidden={!open}
      >
        <div className="ai-chatbot__header">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" aria-hidden />
            <div>
              <p className="text-xs font-semibold tracking-wide uppercase opacity-80">
                Sitecore Search
              </p>
              <h2 className="text-base font-bold">Chat with University</h2>
            </div>
          </div>
          <button
            type="button"
            className="rounded p-1 hover:bg-white/15"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div ref={listRef} className="ai-chatbot__messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={
                message.role === 'user'
                  ? 'ai-chatbot__bubble ai-chatbot__bubble--user'
                  : 'ai-chatbot__bubble'
              }
            >
              <p className="whitespace-pre-wrap">{message.text}</p>
              {message.sources && message.sources.length > 0 ? (
                <ul className="ai-chatbot__sources">
                  {message.sources.map((source) => (
                    <li key={source.href}>
                      <a href={source.href}>{source.title}</a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
          {busy ? (
            <div className="ai-chatbot__bubble ai-chatbot__bubble--typing">Searching content…</div>
          ) : null}
        </div>

        {messages.length <= 2 ? (
          <div className="ai-chatbot__prompts">
            {SUGGESTED_PROMPTS.map((prompt) => (
              <button key={prompt} type="button" onClick={() => ask(prompt)}>
                {prompt}
              </button>
            ))}
          </div>
        ) : null}

        <form className="ai-chatbot__composer" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="university-ai-chat">
            Ask a question
          </label>
          <input
            id="university-ai-chat"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about Clearing, courses…"
            autoComplete="off"
          />
          <button type="submit" aria-label="Send" disabled={busy || !input.trim()}>
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>

      <button
        type="button"
        className="ai-chatbot__toggle"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? 'Close chat with University' : 'Chat with University'}
      >
        {open ? (
          <X className="h-4 w-4" aria-hidden />
        ) : (
          <MessageCircle className="h-4 w-4" aria-hidden />
        )}
        <span>{open ? 'Close' : 'Chat with University'}</span>
      </button>
    </div>
  );
}
