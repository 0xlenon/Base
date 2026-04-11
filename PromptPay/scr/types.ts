export interface Agent {
  id: string;
  name: string;
  description: string;
  pricePerThought: string; // in ETH
  avatar: string;
  systemInstruction: string;
  category: "General" | "Coding" | "Creative" | "Finance";
}

export const AGENTS: Agent[] = [
  {
    id: "1",
    name: "Base Architect",
    description: "Expert in Layer 2 solutions and smart contract optimization on Base.",
    pricePerThought: "0.0001",
    avatar: "https://picsum.photos/seed/architect/200",
    systemInstruction: "You are an expert blockchain architect specializing in the Base network. You provide technical, precise, and efficient advice on smart contracts, L2 scaling, and the Base ecosystem.",
    category: "Coding",
  },
  {
    id: "2",
    name: "Creative Muse",
    description: "AI agent for generating high-fidelity creative concepts and storytelling.",
    pricePerThought: "0.00005",
    avatar: "https://picsum.photos/seed/muse/200",
    systemInstruction: "You are a creative muse. You help users brainstorm ideas, write stories, and develop artistic concepts. Your tone is inspiring, poetic, and imaginative.",
    category: "Creative",
  },
  {
    id: "3",
    name: "DeFi Analyst",
    description: "Real-time market analysis and yield farming strategies on Base.",
    pricePerThought: "0.0002",
    avatar: "https://picsum.photos/seed/defi/200",
    systemInstruction: "You are a professional DeFi analyst. You provide insights into market trends, liquidity pools, and yield strategies specifically on the Base network. You are data-driven and cautious.",
    category: "Finance",
  },
  {
    id: "4",
    name: "Generalist Bot",
    description: "A versatile assistant for everyday tasks and general knowledge.",
    pricePerThought: "0.00002",
    avatar: "https://picsum.photos/seed/general/200",
    systemInstruction: "You are a helpful and versatile AI assistant. You can answer questions on a wide range of topics with clarity and helpfulness.",
    category: "General",
  },
];
