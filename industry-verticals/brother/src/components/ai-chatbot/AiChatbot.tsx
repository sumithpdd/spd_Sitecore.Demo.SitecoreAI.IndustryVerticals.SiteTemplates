'use client';

import { FormEvent, JSX, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { MessageCircle, Send, Sparkles, X } from 'lucide-react';
import { answerChat, suggestedPromptsForIntent, type ChatSource } from 'lib/chat-knowledge';
import { recordSearchEvent } from 'lib/cdp/cdp-session-tracker';
import { resolveBrotherIntent, type BrotherIntent } from 'lib/brother-intent';

type ChatRole = 'user' | 'assistant';

type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
  sources?: ChatSource[];
};

const WELCOME_BY_INTENT: Record<BrotherIntent, string> = {
  default:
    'Hi — I walk the Brother demo story. Ask about Jack (SERP → printers), Izzy (At your side / VC-500W), or Rick (OrderCloud supplies). Pick a chip or type your own.',
  'home-printer':
    'Jack’s printers beat is live. Ask how the Google SERP → personalised printers journey works, which laser to shortlist, or how he reorders toner.',
  'label-printer':
    'Izzy’s labelling beat is live. Ask about the VC-500W, ZINK Zero Ink, or desk organisation content from Content Hub.',
  'at-your-side':
    'Izzy’s At your side pack is live. Ask how one SitecoreAI brief becomes web, email and paid social — then where Jack or labelling continue.',
  'return-visit':
    'Jack’s return visit is live. Ask how printer interest + return signals resurface the shortlist and ink reminder.',
  supplies:
    'Rick’s supplies / OrderCloud beat is live. Ask about attach rate, TN-243BK toner, DK rolls, or the checkout demo.',
};

/**
 * Pull-up Sitecore Search assistant mapped to the Jack / Izzy / Rick storyboard.
 */
export default function AiChatbot(): JSX.Element {
  const router = useRouter();
  const listRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [intent, setIntent] = useState<BrotherIntent>('default');
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
    const nextIntent = resolveBrotherIntent(
      router.query as Record<string, string | string[] | undefined>
    );
    setIntent(nextIntent);
  }, [router.isReady, router.asPath, router.query]);

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
        aria-label="Chat with Brother"
        aria-hidden={!open}
      >
        <div className="ai-chatbot__header">
          <div className="ai-chatbot__header-title">
            <Sparkles size={16} aria-hidden />
            <div>
              <p className="ai-chatbot__eyebrow">Sitecore Search · Story demo</p>
              <h2 className="ai-chatbot__heading">Chat with Brother</h2>
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
          <label className="ai-chatbot__sr-only" htmlFor="brother-ai-chat">
            Ask a question
          </label>
          <input
            id="brother-ai-chat"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask Jack, Izzy, Rick, VC-500W…"
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
        aria-label={open ? 'Close chat with Brother' : 'Chat with Brother'}
      >
        {open ? <X size={16} aria-hidden /> : <MessageCircle size={16} aria-hidden />}
        <span>{open ? 'Close' : 'Chat with Brother'}</span>
      </button>
    </div>
  );
}
