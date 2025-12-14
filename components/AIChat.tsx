import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { generateText } from '../services/gemini';
import { Language, ChatMessage } from '../types';
import { TEXTS } from '../constants';

interface AIChatProps {
  lang: Language;
}

export const AIChat: React.FC<AIChatProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const systemPrompt = lang === 'pt' 
      ? "Você é um especialista em Roblox Studio. Responda de forma concisa e útil." 
      : "You are a Roblox Studio expert. Answer concisely and helpfully.";

    const response = await generateText(input, systemPrompt);
    
    const botMsg: ChatMessage = { role: 'model', text: response, timestamp: new Date() };
    setMessages(prev => [...prev, botMsg]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 h-96 bg-gray-900 border border-purple-500/30 rounded-xl shadow-2xl flex flex-col overflow-hidden neon-border">
          <div className="bg-purple-900/50 p-3 flex justify-between items-center border-b border-purple-500/20">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Bot size={18} className="text-blue-400" />
              {TEXTS['chat.title'][lang]}
            </h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <X size={18} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-900/90">
            {messages.length === 0 && (
               <div className="text-center text-gray-500 mt-20 text-sm">
                 {TEXTS['chat.placeholder'][lang]}
               </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'model' && <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0"><Bot size={14} /></div>}
                <div className={`p-2 rounded-lg text-sm max-w-[80%] ${msg.role === 'user' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-200'}`}>
                  {msg.text}
                </div>
                {msg.role === 'user' && <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0"><User size={14} /></div>}
              </div>
            ))}
            {loading && <div className="text-xs text-gray-500 animate-pulse">Thinking...</div>}
            <div ref={endRef} />
          </div>

          <div className="p-3 bg-gray-800 border-t border-gray-700 flex gap-2">
            <input 
              type="text" 
              className="flex-1 bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
              placeholder={lang === 'pt' ? 'Digite...' : 'Type message...'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 p-2 rounded-md text-white transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-lg flex items-center justify-center text-white hover:scale-105 transition-transform neon-border"
      >
        <MessageSquare size={24} />
      </button>
    </div>
  );
};