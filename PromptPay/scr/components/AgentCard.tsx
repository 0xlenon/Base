import React from "react";
import { Agent } from "@/src/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "motion/react";

interface AgentCardProps {
  agent: Agent;
  onSelect: (agent: Agent) => void;
}

export function AgentCard({ agent, onSelect }: AgentCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full flex flex-col border-zinc-800 bg-zinc-900/50 backdrop-blur-sm hover:border-zinc-700 transition-colors">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-12 w-12 border border-zinc-800">
            <AvatarImage src={agent.avatar} alt={agent.name} referrerPolicy="no-referrer" />
            <AvatarFallback>{agent.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle className="text-zinc-100">{agent.name}</CardTitle>
            <Badge variant="secondary" className="w-fit mt-1 bg-zinc-800 text-zinc-400 hover:bg-zinc-800">
              {agent.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <CardDescription className="text-zinc-400 line-clamp-3">
            {agent.description}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-3 pt-0">
          <div className="flex items-center justify-between w-full">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Price per thought</span>
            <span className="text-sm font-mono text-emerald-400">{agent.pricePerThought} ETH</span>
          </div>
          <Button 
            onClick={() => onSelect(agent)} 
            className="w-full bg-zinc-100 text-zinc-900 hover:bg-zinc-200 font-medium"
          >
            Start Session
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
