'use client';

import { FormEvent, JSX, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MessageCircle, Send, X } from 'lucide-react';
import { answerChat, suggestedPrompts, type ChatSource } from '@/lib/chat-knowledge';
import { recordSearchEvent } from '@/lib/cdp/cdp-session-tracker';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  sources?: ChatSource[];
};

export const Default = (): JSX.Element => {
  const router = useRouter();
  const listRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Ask about New In, petite denim, Belle Paris, or the Weekday pyjamas. I search the demo catalogue.',
    },
  ]);

  useEffect(() => {
    if (!router.isReady) return;
    const params = new URLSearchParams(router.asPath.split('?')[1] || '');
    if (params.get('utm_source')?.toLowerCase() === 'chatgpt') setOpen(true);
  }, [router.isReady, router.asPath]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, open]);

  const ask = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    recordSearchEvent(trimmed, 'chat');
    const answer = answerChat(trimmed);
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: 'user', text: trimmed },
      { id: `a-${Date.now()}`, role: 'assistant', text: answer.text, sources: answer.sources },
    ]);
    setInput('');
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    ask(input);
  };

  return (
    <div className="asos-chat">
      {open ? (
        <section className="asos-chat__panel" aria-label="ASOS chat">
          <header>
            <strong>Chat with ASOS</strong>
            <button type="button" aria-label="Close chat" onClick={() => setOpen(false)}>
              <X className="size-4" />
            </button>
          </header>
          <div ref={listRef} className="asos-chat__log">
            {messages.map((message) => (
              <article key={message.id} className={message.role}>
                <p>{message.text}</p>
                {message.sources?.length ? (
                  <ul>
                    {message.sources.map((source) => (
                      <li key={source.href}>
                        <Link href={source.href}>{source.title}</Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
          <div className="asos-chat__chips">
            {suggestedPrompts().map((prompt) => (
              <button key={prompt} type="button" onClick={() => ask(prompt)}>
                {prompt}
              </button>
            ))}
          </div>
          <form onSubmit={submit}>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about the edit"
              aria-label="Message"
            />
            <button type="submit" aria-label="Send">
              <Send className="size-4" />
            </button>
          </form>
        </section>
      ) : null}
      <button
        type="button"
        className="asos-chat__toggle"
        aria-label="Open chat"
        onClick={() => setOpen(true)}
      >
        <MessageCircle className="size-5" />
      </button>
    </div>
  );
};

export default Default;
