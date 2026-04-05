import React, { useState, useEffect, useCallback } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Users, History, Wallet, Play, Swords, Info } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface GameState {
  fen: string;
  turn: 'w' | 'b';
  isCheck: boolean;
  isCheckmate: boolean;
  isDraw: boolean;
  history: string[];
}

const ChessboardAny = Chessboard as any;

export default function ChessGame() {
  const [game, setGame] = useState(new Chess());
  const [moveFrom, setMoveFrom] = useState<string | null>(null);
  const [rightClickedSquares, setRightClickedSquares] = useState<any>({});
  const [optionSquares, setOptionSquares] = useState<any>({});

  const makeAMove = useCallback((move: any) => {
    try {
      const result = game.move(move);
      setGame(new Chess(game.fen()));
      return result;
    } catch (e) {
      return null;
    }
  }, [game]);

  function onDrop(sourceSquare: string, targetSquare: string) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q', // always promote to queen for simplicity
    });

    if (move === null) return false;
    return true;
  }

  function resetGame() {
    setGame(new Chess());
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start justify-center p-4 max-w-6xl mx-auto">
      {/* Left Column: Game Info & History */}
      <div className="w-full lg:w-1/3 space-y-6 order-2 lg:order-1">
        <div className="bg-white/50 p-6 hand-drawn-border hand-drawn-shadow">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <History className="w-6 h-6" />
            Hamle Geçmişi
          </h2>
          <div className="h-64 overflow-y-auto font-mono text-sm space-y-1 pr-2">
            {game.history().map((move, i) => (
              <div key={i} className={cn("flex justify-between p-1 border-b border-ink/10", i % 2 === 0 ? "bg-ink/5" : "")}>
                <span className="opacity-50 w-8">{Math.floor(i / 2) + 1}.</span>
                <span className="font-bold flex-1">{move}</span>
              </div>
            ))}
            {game.history().length === 0 && (
              <p className="text-ink/40 italic">Oyun henüz başlamadı...</p>
            )}
          </div>
        </div>

        <div className="bg-white/50 p-6 hand-drawn-border hand-drawn-shadow">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Info className="w-6 h-6" />
            Oyun Durumu
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Sıra:</span>
              <span className="font-bold uppercase">{game.turn() === 'w' ? 'Beyaz' : 'Siyah'}</span>
            </div>
            {game.isCheck() && (
              <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-center font-bold animate-pulse">
                ŞAH!
              </div>
            )}
            {game.isCheckmate() && (
              <div className="bg-ink text-paper px-3 py-2 rounded-lg text-center font-bold">
                MAT! {game.turn() === 'w' ? 'Siyah' : 'Beyaz'} Kazandı.
              </div>
            )}
            <button 
              onClick={resetGame}
              className="w-full py-2 bg-ink text-paper hover:bg-ink/80 transition-colors hand-drawn-border font-bold mt-4"
            >
              Yeni Oyun
            </button>
          </div>
        </div>
      </div>

      {/* Center Column: Board */}
      <div className="w-full lg:w-1/2 order-1 lg:order-2">
        <div className="relative aspect-square w-full max-w-[600px] mx-auto hand-drawn-border p-2 bg-ink/5">
          <ChessboardAny 
            id="BasicBoard"
            position={game.fen()} 
            onPieceDrop={onDrop}
            customDarkSquareStyle={{ backgroundColor: '#93a1a1' }}
            customLightSquareStyle={{ backgroundColor: '#eee8d5' }}
            animationDuration={200}
          />
        </div>
      </div>
    </div>
  );
}
