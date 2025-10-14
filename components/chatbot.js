// import React, { useState, useEffect, useRef } from "react";

// /**
//  * ChatWidget.jsx
//  * A self-contained Next.js + React component that pops open from the bottom-right.
//  * - Uses Tailwind utility classes for styling (no Tailwind = fallback CSS included below)
//  * - Default export a React component
//  * - Includes simple mock bot replies. Replace `sendToBackend` with your API call.
//  *
//  * Usage:
//  * 1) Put this file in /components/ChatWidget.jsx
//  * 2) Import and include <ChatWidget /> in your layout (e.g. app/layout or pages/_app)
//  *
//  * Optional: create an API route at /pages/api/chat.js that talks to your real chatbot (OpenAI, Rasa, etc.)
//  */

// export default function ChatWidget() {
//   const [open, setOpen] = useState(false);
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([
//     { id: 1, from: "bot", text: "Hi — I'm your assistant. How can I help?" },
//   ]);
//   const [isSending, setIsSending] = useState(false);
//   const [unread, setUnread] = useState(0);
//   const containerRef = useRef(null);
//   const inputRef = useRef(null);

//   // focus input when opened
//   useEffect(() => {
//     if (open) {
//       setUnread(0);
//       setTimeout(() => inputRef.current?.focus(), 120);
//     }
//   }, [open]);

//   // simple mock backend call — replace with real API call
//   async function sendToBackend(userText) {
//     // Example: call your serverless API
//     // const res = await fetch('/api/chat', {method:'POST', body: JSON.stringify({message:userText})});
//     // const data = await res.json();
//     // return data.reply;

//     // Mock delay + canned replies for demo/demoing locally without API
//     await new Promise((r) => setTimeout(r, 700));
//     const lower = userText.toLowerCase();
//     if (lower.includes("hello") || lower.includes("hi")) return "Hello there! What can I do for you today?";
//     if (lower.includes("price") || lower.includes("cost")) return "Pricing depends on usage. Would you like a link to plans?";
//     return "Thanks — I got that. For full answers hook this widget to your chatbot API (see comments).";
//   }

//   async function handleSend(e) {
//     e?.preventDefault();
//     const text = input.trim();
//     if (!text) return;
//     const userMessage = { id: Date.now(), from: "user", text };
//     setMessages((m) => [...m, userMessage]);
//     setInput("");
//     setIsSending(true);

//     try {
//       const reply = await sendToBackend(text);
//       const botMessage = { id: Date.now() + 1, from: "bot", text: reply };
//       setMessages((m) => [...m, botMessage]);
//     } catch (err) {
//       const errMsg = { id: Date.now() + 2, from: "bot", text: "Sorry — something went wrong." };
//       setMessages((m) => [...m, errMsg]);
//     } finally {
//       setIsSending(false);
//       // scroll to bottom
//       requestAnimationFrame(() => containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' }));
//     }
//   }

//   // Handle unread count when closed and new bot message arrives
//   useEffect(() => {
//     if (!open) {
//       const last = messages[messages.length - 1];
//       if (last?.from === 'bot') setUnread((u) => u + 1);
//     }
//   }, [messages]);

//   return (
//     <div>
//       {/* Floating button */}
//       <div className="fixed bottom-6 right-6 z-50">
//         <button
//           aria-label={open ? 'Close chat' : 'Open chat'}
//           onClick={() => setOpen((v) => !v)}
//           className="relative inline-flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform transform hover:scale-105 active:scale-95 focus:outline-none"
//           style={{ background: '#0ea5a4', color: 'white' }}
//         >
//           {/* Icon */}
//           <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4-.84L3 20l1.16-3.04A7.968 7.968 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//           </svg>

//           {/* unread badge */}
//           {unread > 0 && !open && (
//             <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white rounded-full" style={{ background: '#ef4444' }}>{unread}</span>
//           )}
//         </button>
//       </div>

//       {/* Chat panel */}
//       <div
//         className={`fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-white rounded-2xl shadow-2xl transform transition-all duration-200 ease-in-out ${open ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-6 invisible'}`}
//       >
//         <div className="flex items-center justify-between px-4 py-3 border-b">
//           <div className="flex items-center space-x-3">
//             <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-teal-500 to-cyan-400 flex items-center justify-center text-white font-bold">AI</div>
//             <div>
//               <div className="text-sm font-semibold">Site Assistant</div>
//               <div className="text-xs text-gray-500">Typically replies in a few seconds</div>
//             </div>
//           </div>
//           <div className="flex items-center space-x-2">
//             <button onClick={() => { setOpen(false); }} className="text-gray-400 hover:text-gray-700 focus:outline-none">Close</button>
//           </div>
//         </div>

//         <div ref={containerRef} className="h-64 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
//           {messages.map((m) => (
//             <div key={m.id} className={`flex ${m.from === 'bot' ? 'items-start' : 'justify-end'}`}>
//               {m.from === 'bot' && (
//                 <div className="mr-2 w-8 h-8 rounded-full bg-white border flex items-center justify-center text-sm text-gray-700">🤖</div>
//               )}

//               <div className={`${m.from === 'bot' ? 'bg-white text-gray-800' : 'bg-teal-500 text-white'} max-w-[78%] p-3 rounded-xl`}>
//                 <div className="text-sm break-words">{m.text}</div>
//               </div>

//               {m.from === 'user' && (
//                 <div className="ml-2 w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white text-sm">U</div>
//               )}
//             </div>
//           ))}
//         </div>

//         <form onSubmit={handleSend} className="flex items-center gap-2 p-3 border-t">
//           <input
//             ref={inputRef}
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder={isSending ? 'Waiting...' : 'Type a message...'}
//             className="flex-1 px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-teal-200 text-sm"
//             disabled={isSending}
//             aria-label="Type a message"
//           />
//           <button type="submit" className="inline-flex items-center px-3 py-2 rounded-xl bg-teal-500 text-white hover:opacity-95 focus:outline-none" disabled={isSending}>
//             {isSending ? '...' : 'Send'}
//           </button>
//         </form>
//       </div>

//       {/* minimal fallback CSS if Tailwind isn't available */}
//       <style jsx>{`
//         @media (max-width: 640px) {
//           div[role='root'] {}
//         }
//       `}</style>
//     </div>
//   );
// }


/*
Optional serverless API example (pages/api/chat.js)

// pages/api/chat.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { message } = JSON.parse(req.body || '{}');
  // Here you can call OpenAI / your chatbot backend and return a reply.
  // Example (pseudo):
  // const reply = await callOpenAI(message);
  const reply = `Echo: ${message}`; // placeholder
  res.status(200).json({ reply });
}

Integration notes:
- Replace sendToBackend in the component with a fetch to /api/chat and return data.reply
- Add required environment variables (API keys) to Vercel or your host
*/


// App.tsx
// import { useEffect } from 'react';
// import '@n8n/chat/style.css';
// import { createChat } from '@n8n/chat';

// export const Chatbot = () => {
// 	useEffect(() => {
// 		createChat({
// 			webhookUrl: 'http://localhost:5678/webhook/f65d7236-83a7-4ab0-b0d8-755846675f8c/chat'
// 		});
// 	}, []);

// 	return (<div></div>);
// };


// import dynamic from 'next/dynamic';
// import '@n8n/chat/style.css';

// // Wrap your chat initialization in a component
// const ChatbotClient = () => {
//   // This runs only in the browser
//   React.useEffect(() => {
//     import('@n8n/chat').then(({ createChat }) => {
//       createChat({
//         webhookUrl: 'http://localhost:5678/webhook/f65d7236-83a7-4ab0-b0d8-755846675f8c/chat',
//       });
//     });
//   }, []);

//   return <div id="n8n-chat-root" />; // Ensure a container div exists
// };

// // Dynamically import it with SSR disabled
// const Chatbot = dynamic(() => Promise.resolve(ChatbotClient), { ssr: false });

// export default Chatbot;

// components/ChatWidget.js
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import "@n8n/chat/style.css"; // make sure this is also imported in _app.js

// Initialize n8n chat on the client side
const initN8nChat = () => {
  if (typeof window === "undefined") return;
  import("@n8n/chat").then(({ createChat }) => {
    createChat({ 
        webhookUrl: 'http://localhost:5678/webhook/f65d7236-83a7-4ab0-b0d8-755846675f8c/chat'
    });
  });
};

const ChatWidgetClient = ({ webhookUrl }) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, from: "bot", text: "Hi — I'm your assistant. How can I help?" },
  ]);
  const [isSending, setIsSending] = useState(false);
  const [unread, setUnread] = useState(0);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize n8n chat
  useEffect(() => {
    initN8nChat();
  }, []);

  // Focus input when chat opens
  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [open]);

  // Send user message to n8n webhook
  async function sendToN8n(userText) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      if (!res.ok) throw new Error("n8n webhook error");

      const data = await res.json();
      // Expecting { reply: "..." } from n8n
      return data.reply || "No response from bot";
    } catch (err) {
      console.error(err);
      return "Sorry — something went wrong connecting to the bot.";
    }
  }

  async function handleSend(e) {
    e?.preventDefault();
    const text = input.trim();
    if (!text) return;

    const userMessage = { id: Date.now(), from: "user", text };
    setMessages((m) => [...m, userMessage]);
    setInput("");
    setIsSending(true);

    try {
      const reply = await sendToN8n(text);
      const botMessage = { id: Date.now() + 1, from: "bot", text: reply };
      setMessages((m) => [...m, botMessage]);
    } finally {
      setIsSending(false);
      // Scroll to bottom
      requestAnimationFrame(() =>
        containerRef.current?.scrollTo({
          top: containerRef.current.scrollHeight,
          behavior: "smooth",
        })
      );
    }
  }

  // Track unread messages when closed
  useEffect(() => {
    if (!open) {
      const last = messages[messages.length - 1];
      if (last?.from === "bot") setUnread((u) => u + 1);
    }
  }, [messages, open]);

  return (
    <div>
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* <button
          aria-label={open ? "Close chat" : "Open chat"}
          onClick={() => setOpen((v) => !v)}
          className="relative inline-flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform transform hover:scale-105 active:scale-95 focus:outline-none"
          style={{ background: "#0ea5a4", color: "white" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4-.84L3 20l1.16-3.04A7.968 7.968 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>

          {unread > 0 && !open && (
            <span
              className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white rounded-full"
              style={{ background: "#ef4444" }}
            >
              {unread}
            </span>
          )}
        </button> */}
      </div>

      {/* Chat panel */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-white rounded-2xl shadow-2xl transform transition-all duration-200 ease-in-out ${
          open
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 translate-y-6 invisible"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-teal-500 to-cyan-400 flex items-center justify-center text-white font-bold">
              AI
            </div>
            <div>
              <div className="text-sm font-semibold">Site Assistant</div>
              <div className="text-xs text-gray-500">
                Typically replies in a few seconds
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-gray-700 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>

        <div
          ref={containerRef}
          className="h-64 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50"
        >
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.from === "bot" ? "items-start" : "justify-end"}`}
            >
              {m.from === "bot" && (
                <div className="mr-2 w-8 h-8 rounded-full bg-white border flex items-center justify-center text-sm text-gray-700">
                  🤖
                </div>
              )}
              <div
                className={`${
                  m.from === "bot"
                    ? "bg-white text-gray-800"
                    : "bg-teal-500 text-white"
                } max-w-[78%] p-3 rounded-xl`}
              >
                <div className="text-sm break-words">{m.text}</div>
              </div>
              {m.from === "user" && (
                <div className="ml-2 w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white text-sm">
                  U
                </div>
              )}
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSend}
          className="flex items-center gap-2 p-3 border-t"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isSending ? "Waiting..." : "Type a message..."}
            className="flex-1 px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-teal-200 text-sm"
            disabled={isSending}
            aria-label="Type a message"
          />
          <button
            type="submit"
            className="inline-flex items-center px-3 py-2 rounded-xl bg-teal-500 text-white hover:opacity-95 focus:outline-none"
            disabled={isSending}
          >
            {isSending ? "..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

// Dynamic export disables SSR (n8n chat is browser-only)
const ChatWidget = dynamic(
  () => Promise.resolve(ChatWidgetClient),
  { ssr: false }
);

export default ChatWidget;
