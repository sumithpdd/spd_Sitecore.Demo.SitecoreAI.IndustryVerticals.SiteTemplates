'use client';

import { FormEvent, JSX, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { MessageCircle, Send, X } from 'lucide-react';
import { answerChat, CHAT_PROMPTS } from '@/lib/chat-knowledge';
import { parseDemoParams } from '@/lib/demo-params';
import Link from 'next/link';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  sources?: { title: string; href: string }[];
};

export default function AiChatbot(): JSX.Element {
  const router = useRouter();
  const listRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Hi — I walk the Openhand demo. Ask about energy bills, Northgate, or the storyboard.',
    },
  ]);

  useEffect(() => {
    if (!router.isReady) return;
    if (parseDemoParams(router.asPath).utmSource === 'chatgpt') {
      setOpen(true);
    }
  }, [router.isReady, router.asPath]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, open]);

  const ask = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    const reply = answerChat(trimmed);
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: 'user', text: trimmed },
      { id: `a-${Date.now()}`, role: 'assistant', text: reply.text, sources: reply.sources },
    ]);
    setInput('');
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    ask(input);
  };

  return (
    <div className="oh-chat">
      {open && (
        <div className="oh-chat__panel">
          <div className="flex items-center justify-between border-b border-[var(--oh-line)] px-3 py-2">
            <strong>Chat with Openhand</strong>
            <button type="button" aria-label="Close chat" onClick={() => setOpen(false)}>
              <X className="size-4" />
            </button>
          </div>
          <div ref={listRef} className="max-h-80 overflow-auto p-3 text-sm">
            {messages.map((message) => (
              <div key={message.id} className="mb-3">
                <p className={message.role === 'user' ? 'font-semibold' : ''}>{message.text}</p>
                {message.sources?.map((source) => (
                  <Link key={source.href} className="mr-2 text-[var(--oh-teal)]" href={source.href}>
                    {source.title}
                  </Link>
                ))}
              </div>
            ))}
            <div className="flex flex-wrap gap-1">
              {CHAT_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  className="rounded-full border px-2 py-1 text-xs"
                  onClick={() => ask(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
          <form onSubmit={submit} className="flex gap-2 border-t border-[var(--oh-line)] p-2">
            <input
              className="w-full px-2"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              aria-label="Ask"
            />
            <button type="submit" aria-label="Send">
              <Send className="size-4" />
            </button>
          </form>
        </div>
      )}
      <button
        type="button"
        className="oh-btn oh-btn--navy"
        onClick={() => setOpen((value) => !value)}
        aria-label="Open chat"
      >
        <MessageCircle className="size-5" />
      </button>
    </div>
  );
}
