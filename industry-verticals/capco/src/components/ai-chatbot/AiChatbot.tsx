'use client';

import { FormEvent, JSX, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { MessageCircle, Send, Sparkles, X } from 'lucide-react';
import {
  answerChat,
  resolveLegalChatIntent,
  suggestedPromptsForIntent,
  type ChatSource,
  type LegalChatIntent,
} from '@/lib/chat-knowledge';
import { recordSearchEvent } from '@/lib/cdp/cdp-session-tracker';

type ChatRole = 'user' | 'assistant';

type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
  sources?: ChatSource[];
};

const WELCOME_BY_INTENT: Record<LegalChatIntent, string> = {
  default:
    'Hi — I walk the Capco demo story. Ask about Priya (ChatGPT → T+1 Perspective → Elisabeth Plakinger), Thomas, Emma, or Vince. Pick a chip or type your own.',
  'priya-guide':
    'Priya’s discovery beat is live. Ask about Europe’s T+1 Perspective, who wrote it, or why related work used to misfire.',
  elisabeth:
    'Elisabeth’s profile beat is live. Ask about T+1 Europe, how Emma publishes a CV draft, or Priya’s path to this consultant.',
  industry:
    'Industry beat is live. Ask how a closed engagement becomes a credential on every surface, or open Elisabeth and the T+1 Perspective.',
  story:
    'Presenter view is live. Ask what we heard in the RFP, who Priya and Thomas are, or walk the three-act storyboard.',
};

export default function AiChatbot(): JSX.Element {
  const router = useRouter();
  const listRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [intent, setIntent] = useState<LegalChatIntent>('default');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: WELCOME_BY_INTENT.default,
    },
  ]);

  useEffect(() => {
    if (!router.isReady) return;
    const params = new URLSearchParams(router.asPath.split('?')[1] || '');
    if (params.get('utm_source')?.toLowerCase() === 'chatgpt') {
      setOpen(true);
    }
    setIntent(resolveLegalChatIntent(router.asPath.split('?')[0] || '/'));
  }, [router.isReady, router.asPath]);

  useEffect(() => {
    setMessages((prev) => {
      if (prev.length !== 1 || prev[0]?.id !== 'welcome') return prev;
      return [{ id: 'welcome', role: 'assistant', text: WELCOME_BY_INTENT[intent] }];
    });
  }, [intent]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, busy, open]);

  const prompts = suggestedPromptsForIntent(intent);

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
        aria-label="Chat with Capco"
        aria-hidden={!open}
      >
        <div className="ai-chatbot__header">
          <div className="ai-chatbot__header-title">
            <Sparkles size={16} aria-hidden />
            <div>
              <p className="ai-chatbot__eyebrow">Sitecore Search · Story demo</p>
              <h2 className="ai-chatbot__heading">Chat with Capco</h2>
            </div>
          </div>
          <button
            type="button"
            className="ai-chatbot__icon-btn"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
          >
            <X size={20} />
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
              <p>{message.text}</p>
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
            {prompts.map((prompt) => (
              <button key={prompt} type="button" onClick={() => ask(prompt)}>
                {prompt}
              </button>
            ))}
          </div>
        ) : null}

        <form className="ai-chatbot__composer" onSubmit={handleSubmit}>
          <label className="ai-chatbot__sr-only" htmlFor="legal-ai-chat">
            Ask a question
          </label>
          <input
            id="legal-ai-chat"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask Priya, Elisabeth, T+1, Thomas…"
            autoComplete="off"
          />
          <button type="submit" aria-label="Send" disabled={busy || !input.trim()}>
            <Send size={16} />
          </button>
        </form>
      </div>

      <button
        type="button"
        className="ai-chatbot__toggle"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? 'Close chat with Capco' : 'Chat with Capco'}
      >
        {open ? <X size={16} aria-hidden /> : <MessageCircle size={16} aria-hidden />}
        <span>{open ? 'Close' : 'Chat with Capco'}</span>
      </button>
    </div>
  );
}
