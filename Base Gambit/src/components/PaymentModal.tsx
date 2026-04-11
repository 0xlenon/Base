import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Agent } from "@/src/types";
import { CreditCard, Loader2, Wallet } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  agent: Agent | null;
}

export function PaymentModal({ isOpen, onClose, onSuccess, agent }: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<"initial" | "processing" | "success">("initial");

  const handlePayment = async () => {
    setIsProcessing(true);
    setStep("processing");
    
    // Simulate blockchain transaction on Base
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setStep("success");
    setIsProcessing(false);
    
    setTimeout(() => {
      onSuccess();
      setStep("initial");
    }, 1500);
  };

  if (!agent) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-950 border-zinc-800 text-zinc-100">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <CreditCard className="w-5 h-5 text-emerald-400" />
            402 Payment Required
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            This AI response requires a micro-payment on the Base network.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          <AnimatePresence mode="wait">
            {step === "initial" && (
              <motion.div
                key="initial"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-zinc-500 uppercase tracking-widest">Amount</span>
                    <span className="text-lg font-mono text-emerald-400">{agent.pricePerThought} ETH</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-zinc-500 uppercase tracking-widest">Network</span>
                    <span className="text-sm font-medium text-zinc-300">Base Mainnet</span>
                  </div>
                </div>
                <div className="text-xs text-zinc-500 bg-zinc-900/50 p-3 rounded border border-zinc-800/50 italic">
                  "Pay-per-Thought ensures you only pay for the intelligence you consume. No subscriptions, no waste."
                </div>
              </motion.div>
            )}

            {step === "processing" && (
              <motion.div
                key="processing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-8 space-y-4"
              >
                <Loader2 className="w-12 h-12 text-emerald-400 animate-spin" />
                <div className="text-center">
                  <p className="font-medium">Processing Transaction</p>
                  <p className="text-sm text-zinc-500">Confirming on Base...</p>
                </div>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-8 space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12 }}
                  >
                    <Wallet className="w-6 h-6 text-emerald-400" />
                  </motion.div>
                </div>
                <div className="text-center">
                  <p className="font-medium text-emerald-400">Payment Successful</p>
                  <p className="text-sm text-zinc-500">Unlocking thought...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <DialogFooter>
          {step === "initial" && (
            <div className="flex gap-3 w-full">
              <Button variant="outline" onClick={onClose} className="flex-1 border-zinc-800 hover:bg-zinc-900 text-zinc-400">
                Cancel
              </Button>
              <Button onClick={handlePayment} disabled={isProcessing} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold">
                Pay with Wallet
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
