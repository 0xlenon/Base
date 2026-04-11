import React, { useState, useRef, useEffect } from "react";
import { Agent } from "@/src/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Send, ArrowLeft, Loader2, Sparkles, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { generateAgentResponse } from "@/src/lib/gemini";
import { PaymentModal } from "./PaymentModal";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isPaid?: boolean;
}

interface ChatInterfaceProps {
  agent: Agent;
  onBack: () => void;
}

export function ChatInterface({ agent, onBack }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    
    // Add user message to chat
    setMessages(prev => [...prev, { role: "user", content: userMessage, timestamp: new Date() }]);
    
    // Trigger payment modal (x402 simulation)
    setPendingMessage(userMessage);
    setIsPaymentModalOpen(true);
  };

  const onPaymentSuccess = async () => {
    setIsPaymentModalOpen(false);
    if (!pendingMessage) return;

    setIsLoading(true);
    try {
      const response = await generateAgentResponse(agent.name, agent.systemInstruction, pendingMessage);
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: response || "I'm sorry, I couldn't process that thought.", 
        timestamp: new Date(),
        isPaid: true
      }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Error: Payment confirmed but thought generation failed. Please try again.", 
        timestamp: new Date() 
      }]);
    } finally {
      setIsLoading(false);
      setPendingMessage(null);
    }
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="p-4 border-bottom border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Avatar className="h-10 w-10 border border-zinc-700">
            <AvatarImage src={agent.avatar} alt={agent.name} referrerPolicy="no-referrer" />
            <AvatarFallback>{agent.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm font-bold text-zinc-100">{agent.name}</h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px] py-0 px-1.5 border-emerald-500/30 text-emerald-400 bg-emerald-500/5">
                {agent.pricePerThought} ETH / thought
              </Badge>
              <div className="flex items-center gap-1 text-[10px] text-zinc-500">
                <ShieldCheck className="w-3 h-3" />
                <span>Base Verified</span>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-zinc-500 font-mono">AGENT_ONLINE</span>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-grow p-4 space-y-4" viewportRef={scrollRef}>
        <div className="flex flex-col gap-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
              <div className="p-4 rounded-full bg-zinc-900 border border-zinc-800">
                <Sparkles className="w-8 h-8 text-zinc-600" />
              </div>
              <div className="max-w-xs">
                <p className="text-zinc-400 text-sm">
                  Start a conversation with <span className="text-zinc-200">{agent.name}</span>. 
                  Each response will require a micro-payment of <span className="text-emerald-400">{agent.pricePerThought} ETH</span>.
                </p>
              </div>
            </div>
          )}
          
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: msg.role === "user" ? 10 : -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[85%] rounded-2xl p-4 ${
                msg.role === "user" 
                  ? "bg-zinc-100 text-zinc-900 rounded-tr-none" 
                  : "bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-tl-none"
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                <div className={`flex items-center gap-2 mt-2 text-[10px] ${msg.role === "user" ? "text-zinc-500" : "text-zinc-500"}`}>
                  <span>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  {msg.isPaid && (
                    <Badge variant="outline" className="text-[8px] py-0 px-1 border-emerald-500/20 text-emerald-500 bg-emerald-500/5">
                      PAID_VIA_X402
                    </Badge>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl rounded-tl-none p-4 flex items-center gap-3">
                <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />
                <span className="text-xs text-zinc-500 font-mono tracking-tighter">GENERATING_THOUGHT...</span>
              </div>
            </motion.div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 bg-zinc-900/30 border-t border-zinc-800">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="bg-zinc-950 border-zinc-800 text-zinc-100 focus-visible:ring-emerald-500/50"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            className="bg-emerald-500 hover:bg-emerald-600 text-zinc-950 px-6"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
        <p className="text-[10px] text-zinc-600 mt-2 text-center">
          By sending a message, you agree to the micro-payment terms on the Base network.
        </p>
      </div>

      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => {
          setIsPaymentModalOpen(false);
          setPendingMessage(null);
        }} 
        onSuccess={onPaymentSuccess}
        agent={agent}
      />
    </div>
  );
}
