"use client";
import React, { useState, useEffect, useRef } from "react";
import { 
  MessageSquare, X, Send, Bot, Sparkles, 
  Terminal, BarChart2, HelpCircle, ChevronRight 
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function RegistryAIChat({ transactions }: { transactions: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "NODE_INTELLIGENCE_ONLINE. I can provide FAQ data or transaction insights. How can I assist?",
      timestamp: new Date(),
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  // --- DUMMY AI LOGIC ---
  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    const query = input.toLowerCase();
    setInput("");

    // Simulate "Thinking"
    setTimeout(() => {
      let response = "";

      // 1. Transaction Insight Logic (e.g., "Opay this month")
      if (query.includes("opay") || query.includes("zenith") || query.includes("apex")) {
        const bankName = query.includes("opay") ? "OPay" : query.includes("zenith") ? "Zenith Node" : "Apex Bank";
        const bankData = transactions.filter(t => t.bankName.toLowerCase().includes(bankName.toLowerCase()));
        const total = bankData.reduce((sum, t) => sum + t.amount, 0);
        
        response = `[QUERY_RESULT]: Total volume for ${bankName} in current ledger is ₦${total.toLocaleString()}. This involves ${bankData.length} unique node events.`;
      } 
      // 2. FAQ Logic
      else if (query.includes("stemgate") || query.includes("what is")) {
        response = "StemGate is a high-throughput financial middleware protocol designed for real-time ledger synchronization across multiple banking nodes.";
      } 
      else if (query.includes("trend") || query.includes("insight")) {
        const inflow = transactions.filter(t => t.type === "INCOMING").length;
        const outflow = transactions.filter(t => t.type === "OUTGOING").length;
        response = `CURRENT_TREND: System is currently ${inflow > outflow ? "INFLOW_HEAVY" : "OUTFLOW_HEAVY"}. Ratio: ${inflow}:${outflow}.`;
      }
      // 3. Default
      else {
        response = "Command not recognized. Try asking about specific banks (e.g., 'Zenith trends') or StemGate FAQs.";
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000] font-sans">
      {/* --- CHAT WINDOW --- */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[380px] h-[500px] bg-white border border-zinc-200 shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col animate-in slide-in-from-bottom-4 duration-300 overflow-hidden">
          
          {/* Header */}
          <div className="bg-zinc-950 p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">StemGate_AI_v1.0</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50/50 custom-scrollbar">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] p-3 text-[11px] font-bold leading-relaxed ${
                  msg.role === "user" 
                  ? "bg-orange-800 text-white rounded-l-lg rounded-tr-lg" 
                  : "bg-white border border-zinc-200 text-zinc-800 rounded-r-lg rounded-tl-lg shadow-sm"
                }`}>
                  {msg.role === "assistant" && <Terminal size={10} className="mb-2 opacity-50" />}
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Suggestions */}
          <div className="px-4 py-2 flex gap-2 overflow-x-auto border-t border-zinc-100 bg-white no-scrollbar">
            {["Opay Insights", "What is StemGate?", "Current Trends"].map((hint) => (
              <button 
                key={hint} 
                onClick={() => setInput(hint)}
                className="shrink-0 text-[9px] font-black uppercase bg-zinc-100 text-zinc-500 px-3 py-1.5 hover:bg-zinc-950 hover:text-white transition-all"
              >
                {hint}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-zinc-200 flex gap-2">
            <input 
              type="text" 
              value={input}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              onChange={(e) => setInput(e.target.value)}
              placeholder="ASK_SYSTEM_PROMPT..."
              className="flex-1 bg-zinc-50 border-none px-4 py-2 text-[10px] font-black uppercase tracking-widest outline-none focus:ring-1 ring-orange-800"
            />
            <button 
              onClick={handleSend}
              className="bg-zinc-950 text-white p-2 hover:bg-orange-800 transition-all"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      {/* --- FLOATING TOGGLE BUTTON --- */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          isOpen ? "bg-red-600 rotate-90" : "bg-zinc-950 hover:bg-orange-800"
        } text-white`}
      >
        {isOpen ? <X size={24} /> : <Bot size={24} />}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full border-2 border-white flex items-center justify-center">
            <Sparkles size={8} className="text-white" />
          </div>
        )}
      </button>
    </div>
  );
}