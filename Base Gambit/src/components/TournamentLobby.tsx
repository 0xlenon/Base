import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Users, Swords, Zap, ShieldCheck, Coins } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const TOURNAMENTS = [
  { id: 1, name: "Base Genesis Open", entry: "0.01 ETH", prize: "0.5 ETH", players: "12/16", status: "active" },
  { id: 2, name: "Gambit Blitz Night", entry: "5 USDC", prize: "100 USDC", players: "4/8", status: "waiting" },
  { id: 3, name: "Grandmaster Invitational", entry: "0.1 ETH", prize: "2 ETH", players: "2/4", status: "locked" },
];

export default function TournamentLobby() {
  return (
    <div className="max-w-6xl mx-auto p-4 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<Trophy className="text-yellow-600" />} label="Toplam Ödül" value="12.5 ETH" />
        <StatCard icon={<Users className="text-blue-600" />} label="Aktif Oyuncular" value="1,248" />
        <StatCard icon={<Zap className="text-purple-600" />} label="Tamamlanan Maçlar" value="45,892" />
      </div>

      <div className="bg-white/50 p-8 hand-drawn-border hand-drawn-shadow">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <Swords className="w-8 h-8" />
            Aktif Turnuvalar
          </h2>
          <button className="px-6 py-2 bg-ink text-paper hover:bg-ink/80 transition-colors hand-drawn-border font-bold">
            Turnuva Oluştur
          </button>
        </div>

        <div className="space-y-4">
          {TOURNAMENTS.map((t) => (
            <motion.div 
              key={t.id}
              whileHover={{ scale: 1.01 }}
              className="flex flex-col md:flex-row items-center justify-between p-6 bg-paper/50 border-2 border-ink/10 hover:border-ink/30 transition-all rounded-xl"
            >
              <div className="flex items-center gap-6 mb-4 md:mb-0">
                <div className="w-12 h-12 bg-ink/5 rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 opacity-40" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{t.name}</h3>
                  <p className="text-sm opacity-60 flex items-center gap-2">
                    <Users className="w-4 h-4" /> {t.players} Oyuncu
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-center">
                  <p className="text-xs uppercase opacity-40 font-bold">Giriş</p>
                  <p className="font-mono font-bold">{t.entry}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs uppercase opacity-40 font-bold">Ödül</p>
                  <p className="font-mono font-bold text-accent">{t.prize}</p>
                </div>
                <button className={cn(
                  "px-8 py-2 font-bold transition-all hand-drawn-border",
                  t.status === 'active' ? "bg-accent text-white hover:opacity-90" : "bg-ink/10 text-ink/40 cursor-not-allowed"
                )}>
                  {t.status === 'active' ? 'Katıl' : 'Beklemede'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/50 p-8 hand-drawn-border hand-drawn-shadow">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-purple-600" />
            Son Hareketler
          </h2>
          <div className="space-y-4">
            {[
              { user: "0x71C...3a21", action: "Base Genesis Open turnuvasına katıldı", time: "2dk önce" },
              { user: "0x12A...9b42", action: "0x55F...11e2'yi mat etti (+15 ELO)", time: "5dk önce" },
              { user: "0x99B...cc01", action: "0.5 ETH ödül havuzunu kazandı!", time: "12dk önce" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-3 border-b border-ink/5 last:border-0">
                <div className="w-2 h-2 mt-2 rounded-full bg-accent" />
                <div>
                  <p className="text-sm">
                    <span className="font-mono font-bold text-accent">{item.user}</span>{" "}
                    <span className="opacity-80">{item.action}</span>
                  </p>
                  <p className="text-[10px] font-bold opacity-30 uppercase">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/50 p-8 hand-drawn-border hand-drawn-shadow">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-600" />
            Liderlik Tablosu
          </h2>
          <div className="space-y-4">
            {[
              { rank: 1, user: "vitalik.eth", elo: 2840 },
              { rank: 2, user: "basegod.base", elo: 2715 },
              { rank: 3, user: "gambit_king", elo: 2690 },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-paper/30 rounded-lg">
                <div className="flex items-center gap-4">
                  <span className="font-black text-xl opacity-20 w-6">#{item.rank}</span>
                  <span className="font-bold">{item.user}</span>
                </div>
                <span className="font-mono font-bold bg-ink text-paper px-2 py-1 rounded text-xs">{item.elo} ELO</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="bg-white/50 p-6 hand-drawn-border hand-drawn-shadow flex items-center gap-4">
      <div className="p-3 bg-paper rounded-lg border border-ink/10">
        {icon}
      </div>
      <div>
        <p className="text-sm opacity-60 font-bold uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold font-mono">{value}</p>
      </div>
    </div>
  );
}
