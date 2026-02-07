
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getTrainingAdvice } from '../services/gemini';

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Woof! I'm Jet, your AI Training Assistant. How can I help you with your puppy today?", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const response = await getTrainingAdvice(input, history);
    
    setMessages(prev => [...prev, {
      role: 'model',
      text: response || "I'm not sure how to answer that. Can you rephrase?",
      timestamp: new Date()
    }]);
    setIsLoading(false);
  };

  return (
    <div className="pt-24 pb-20 max-w-4xl mx-auto px-4 h-[calc(100vh-80px)] flex flex-col">
      <div className="glass-card flex-grow rounded-3xl shadow-xl overflow-hidden flex flex-col">
        <div className="bg-brand-600 p-6 text-white flex items-center">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl mr-4">🐕</div>
          <div>
            <h2 className="text-xl font-bold">Jet AI Assistant</h2>
            <p className="text-brand-100 text-xs">Expert Training Advice 24/7</p>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex-grow overflow-y-auto p-6 space-y-4 bg-gray-50/50"
        >
          {messages.map((msg, i) => (
            <div 
              key={i} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-brand-600 text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                }`}
              >
                {msg.text}
                <div className={`text-[10px] mt-2 opacity-50 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none">
                 <div className="flex space-x-2">
                   <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                   <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                   <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                 </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-white border-t border-gray-100">
          <div className="relative flex items-center">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about potty training, biting, or basic cues..."
              className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="absolute right-2 p-2 text-brand-600 hover:text-brand-700 disabled:opacity-50"
            >
              <svg className="w-6 h-6 transform rotate-90" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
          <p className="text-[10px] text-gray-400 text-center mt-2">
            Jet AI can provide advice, but always consult with a professional trainer for serious behavioral issues.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
