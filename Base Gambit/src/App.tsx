import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, useAccount, useConnect, useDisconnect } from 'wagmi';
import { config } from './lib/wagmi';
import ChessGame from './components/ChessGame';
import TournamentLobby from './components/TournamentLobby';
import { motion, AnimatePresence } from 'motion/react';
import { Swords, Trophy, Wallet, LogOut, Menu, X, Github } from 'lucide-react';
import { cn } from './lib/utils';

const queryClient = new QueryClient();

function AppContent() {
  const [view, setView] = useState<'lobby' | 'game'>('lobby');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b-2 border-ink/10 bg-white/30 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setView('lobby')}>
            <div className="w-12 h-12 bg-ink text-paper rounded-lg flex items-center justify-center hand-drawn-border rotate-3">
              <Swords className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter leading-none">BASE GAMBIT</h1>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Fully On-Chain Chess</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => setView('lobby')}
              className={cn("font-bold text-sm uppercase tracking-widest transition-all hover:text-accent", view === 'lobby' ? "text-accent" : "text-ink")}
            >
              Turnuvalar
            </button>
            <button 
              onClick={() => setView('game')}
              className={cn("font-bold text-sm uppercase tracking-widest transition-all hover:text-accent", view === 'game' ? "text-accent" : "text-ink")}
            >
              Hızlı Maç
            </button>
            
            <div className="h-8 w-[2px] bg-ink/10 mx-2" />

            {isConnected ? (
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold opacity-40 uppercase">Cüzdan Bağlı</span>
                  <span className="font-mono text-xs font-bold">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
                </div>
                <button 
                  onClick={() => disconnect()}
                  className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => connect({ connector: connectors[0] })}
                className="flex items-center gap-2 px-6 py-2 bg-ink text-paper font-bold hand-drawn-border hover:bg-ink/80 transition-all"
              >
                <Wallet className="w-4 h-4" />
                Cüzdan Bağla
              </button>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-paper border-b-2 border-ink/10 p-4 space-y-4 z-40"
          >
            <button onClick={() => { setView('lobby'); setIsMenuOpen(false); }} className="w-full text-left font-bold py-2">Turnuvalar</button>
            <button onClick={() => { setView('game'); setIsMenuOpen(false); }} className="w-full text-left font-bold py-2">Hızlı Maç</button>
            {!isConnected ? (
              <button onClick={() => connect({ connector: connectors[0] })} className="w-full flex items-center gap-2 px-6 py-3 bg-ink text-paper font-bold hand-drawn-border">
                <Wallet className="w-4 h-4" /> Cüzdan Bağla
              </button>
            ) : (
              <button onClick={() => disconnect()} className="w-full flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold hand-drawn-border">
                <LogOut className="w-4 h-4" /> Bağlantıyı Kes
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {view === 'lobby' ? <TournamentLobby /> : <ChessGame />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t-2 border-ink/10 bg-ink/5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="font-black text-xl mb-2">BASE GAMBIT</h3>
            <p className="text-sm opacity-60 max-w-xs">Base ağı üzerinde tamamen zincir içi satranç ve strateji protokolü.</p>
          </div>
          
          <div className="flex gap-8">
            <a href="#" className="opacity-40 hover:opacity-100 transition-opacity"><Github className="w-6 h-6" /></a>
            <a href="#" className="opacity-40 hover:opacity-100 transition-opacity font-bold">Docs</a>
            <a href="#" className="opacity-40 hover:opacity-100 transition-opacity font-bold">Base</a>
          </div>

          <div className="text-sm opacity-40 font-bold">
            © 2024 Base Gambit Protocol
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
