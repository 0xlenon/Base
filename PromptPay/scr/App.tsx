import { useState } from "react";
import { AGENTS, Agent } from "./types";
import { AgentCard } from "./components/AgentCard";
import { ChatInterface } from "./components/ChatInterface";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "motion/react";
import { BrainCircuit, Wallet, Zap, Shield, Globe, Cpu, ChevronRight, LogOut } from "lucide-react";
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export default function App() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [currentView, setCurrentView] = useState<"marketplace" | "developers" | "docs">("marketplace");
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = () => {
    if (connectors.length > 0) {
      connect({ connector: connectors[0] });
    }
  };

  const navigateTo = (view: "marketplace" | "developers" | "docs") => {
    setCurrentView(view);
    setSelectedAgent(null);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-emerald-500/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-zinc-800/50 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo("marketplace")}>
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <BrainCircuit className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-bold tracking-tighter">PromptPay</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400 mr-4">
              <button 
                onClick={() => navigateTo("marketplace")} 
                className={`transition-colors ${currentView === "marketplace" ? "text-emerald-400" : "hover:text-zinc-100"}`}
              >
                Marketplace
              </button>
              <button 
                onClick={() => navigateTo("developers")} 
                className={`transition-colors ${currentView === "developers" ? "text-emerald-400" : "hover:text-zinc-100"}`}
              >
                Developers
              </button>
              <button 
                onClick={() => navigateTo("docs")} 
                className={`transition-colors ${currentView === "docs" ? "text-emerald-400" : "hover:text-zinc-100"}`}
              >
                Docs
              </button>
            </div>
            {isConnected ? (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-zinc-800 text-emerald-400 py-1.5 px-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </Badge>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => disconnect()}
                  className="text-zinc-500 hover:text-red-400 hover:bg-red-400/10"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button 
                onClick={handleConnect}
                className="bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
              >
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {selectedAgent ? (
            <motion.div
              key="chat"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="h-[calc(100vh-12rem)] max-w-4xl mx-auto"
            >
              <ChatInterface 
                agent={selectedAgent} 
                onBack={() => setSelectedAgent(null)} 
              />
            </motion.div>
          ) : currentView === "marketplace" ? (
            <motion.div
              key="marketplace"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-16"
            >
              {/* Hero Section */}
              <section className="text-center space-y-8 py-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Badge variant="outline" className="px-4 py-1 border-emerald-500/30 text-emerald-400 bg-emerald-500/5 mb-4">
                    Powered by Base & x402
                  </Badge>
                  <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
                    Intelligence as a <span className="text-emerald-500">Utility</span>
                  </h1>
                  <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                    The first pay-per-question AI marketplace. No monthly fees, no API keys. 
                    Just high-fidelity thoughts delivered instantly via micro-payments on Base.
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-wrap items-center justify-center gap-4 pt-4"
                >
                  <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold px-8">
                    Browse Agents
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    onClick={() => navigateTo("developers")}
                    className="border-zinc-800 text-zinc-400 hover:bg-zinc-900 px-8"
                  >
                    Deploy Your Agent
                  </Button>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16">
                  {[
                    { icon: Zap, title: "Instant Access", desc: "Pay with x402 and get your answer in milliseconds." },
                    { icon: Shield, title: "Base Secured", desc: "Every transaction is verified on the Base network." },
                    { icon: Globe, title: "Agentic Economy", desc: "Bots paying bots. The future of AI-to-AI commerce." }
                  ].map((feature, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 text-left hover:border-zinc-700 transition-colors">
                      <feature.icon className="w-8 h-8 text-emerald-500 mb-4" />
                      <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                      <p className="text-zinc-500 text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Marketplace Section */}
              <section className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight">Agent Marketplace</h2>
                    <p className="text-zinc-500 mt-1">Select an expert agent to assist with your specific needs.</p>
                  </div>
                  
                  <Tabs defaultValue="all" className="w-full md:w-auto">
                    <TabsList className="bg-zinc-900 border border-zinc-800">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="coding">Coding</TabsTrigger>
                      <TabsTrigger value="creative">Creative</TabsTrigger>
                      <TabsTrigger value="finance">Finance</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {AGENTS.map((agent) => (
                    <div key={agent.id}>
                      <AgentCard 
                        agent={agent} 
                        onSelect={(a) => setSelectedAgent(a)} 
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* CTA Section */}
              <section className="relative overflow-hidden rounded-3xl bg-emerald-500 p-12 text-zinc-950">
                <div className="relative z-10 max-w-2xl">
                  <h2 className="text-4xl font-bold tracking-tight mb-4">Ready to monetize your AI?</h2>
                  <p className="text-zinc-900/80 text-lg mb-8">
                    Join the PromptPay network and start earning ETH for every thought your agent generates.
                  </p>
                  <Button 
                    size="lg" 
                    onClick={() => navigateTo("developers")}
                    className="bg-zinc-950 text-white hover:bg-zinc-900 px-8"
                  >
                    Get Started <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
                <Cpu className="absolute -right-12 -bottom-12 w-64 h-64 text-zinc-950/10 rotate-12" />
              </section>
            </motion.div>
          ) : currentView === "developers" ? (
            <motion.div
              key="developers"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto space-y-12"
            >
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold tracking-tight">Developer Portal</h2>
                <p className="text-zinc-400">Integrate PromptPay into your agents and start earning on Base Sepolia.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold">Smart Contract</h3>
                  <p className="text-zinc-500 text-sm">Deploy the PromptPay protocol to your own environment or use our testnet instance.</p>
                  <div className="flex flex-col gap-2">
                    <Badge variant="outline" className="w-fit border-zinc-700 text-zinc-500">Base Sepolia</Badge>
                    <code className="text-[10px] text-emerald-400 bg-black p-2 rounded truncate">
                      0x420...PromptPayContract
                    </code>
                  </div>
                </div>

                <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold">Deploy Command</h3>
                  <p className="text-zinc-500 text-sm">Use Foundry to deploy the x402 contract to Base Sepolia instantly.</p>
                  <pre className="bg-black p-4 rounded-lg text-[10px] font-mono text-emerald-400 overflow-x-auto">
                    forge create --rpc-url https://sepolia.base.org --private-key $PK contracts/PromptPay.sol:PromptPay
                  </pre>
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                <h3 className="text-xl font-bold mb-6">Solidity Implementation</h3>
                <div className="space-y-4">
                  <p className="text-sm text-zinc-400">The core logic for x402 micro-payments. Agents receive ETH directly upon successful thought generation.</p>
                  <pre className="bg-black/50 p-6 rounded-xl text-xs font-mono text-zinc-400 overflow-y-auto max-h-[300px] border border-zinc-800">
{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PromptPay {
    event ThoughtPaid(address indexed user, address indexed agent, uint256 amount, bytes32 requestId);
    mapping(address => uint256) public balances;

    function payForThought(address agent, bytes32 requestId) external payable {
        require(msg.value > 0, "Payment required");
        balances[agent] += msg.value;
        emit ThoughtPaid(msg.sender, agent, msg.value, requestId);
    }

    function withdraw() external {
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }
}`}
                  </pre>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="docs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto space-y-12"
            >
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold tracking-tight">Documentation</h2>
                <p className="text-zinc-400">Everything you need to know about the PromptPay protocol.</p>
              </div>

              <div className="prose prose-invert max-w-none space-y-8">
                <section className="space-y-4">
                  <h3 className="text-2xl font-bold text-emerald-400">What is PromptPay?</h3>
                  <p className="text-zinc-400 leading-relaxed">
                    PromptPay is a decentralized marketplace built on the Base network that enables a granular, 
                    usage-based economy for artificial intelligence. By leveraging the x402 protocol, 
                    we allow users and autonomous agents to pay for individual "thoughts" or responses 
                    using micro-payments.
                  </p>
                </section>

                <Separator className="bg-zinc-800" />

                <section className="space-y-4">
                  <h3 className="text-2xl font-bold text-emerald-400">The x402 Protocol</h3>
                  <p className="text-zinc-400 leading-relaxed">
                    Inspired by the HTTP 402 Payment Required status code, x402 is a standard for 
                    programmatic micro-payments. When an agent receives a request, it returns an x402 
                    challenge. Once the payment is confirmed on Base, the agent releases the generated content.
                  </p>
                  <ul className="list-disc list-inside text-zinc-500 space-y-2 ml-4">
                    <li>No monthly subscriptions required</li>
                    <li>Pay only for the intelligence you consume</li>
                    <li>Direct economic relationship between users and AI</li>
                    <li>Native support for AI-to-AI transactions</li>
                  </ul>
                </section>

                <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
                  <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800">
                    <h4 className="font-bold mb-2">For Users</h4>
                    <p className="text-xs text-zinc-500">Access world-class AI models without being locked into expensive monthly plans.</p>
                  </div>
                  <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800">
                    <h4 className="font-bold mb-2">For Agents</h4>
                    <p className="text-xs text-zinc-500">Monetize your specialized knowledge instantly with global reach on Base.</p>
                  </div>
                </section>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 bg-black py-12 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-emerald-500" />
            <span className="font-bold tracking-tighter">PromptPay</span>
          </div>
          <div className="flex gap-8 text-sm text-zinc-500">
            <a href="#" className="hover:text-zinc-100">Twitter</a>
            <a href="#" className="hover:text-zinc-100">Discord</a>
            <a href="#" className="hover:text-zinc-100">GitHub</a>
            <a href="#" className="hover:text-zinc-100">Privacy</a>
          </div>
          <p className="text-xs text-zinc-600 font-mono">© 2026 PROMPT_PAY_PROTOCOL</p>
        </div>
      </footer>
    </div>
  );
}
