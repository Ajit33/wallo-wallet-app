"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Copy, Check, Plus } from "lucide-react";
import { useState } from "react";
import { deriveWallets } from "@/utils/deriveWallets";
import SeedGrid from "./SeedGrid";
import WalletCard from "./WalletCard";
import NetworkSelector from "./NetworkSelector";

type Props = {
  words: string[];
  onReset: () => void;
};

type Wallet = {
  publicKey: string;
  privateKey: string;
};

const WalletDashboard = ({ words, onReset }: Props) => {
  const [copied, setCopied] = useState(false);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [network, setNetwork] = useState<"solana" | "ethereum">("solana");

  function handleCopy() {
    navigator.clipboard.writeText(words.join(" "));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleAddWallet() {
    const newWallets = deriveWallets(words.join(" "), network, wallets.length + 1);
    setWallets(newWallets);
  }

  function handleNetworkChange(n: "solana" | "ethereum") {
    setNetwork(n);
    setWallets([]);
  }

  return (
    <div className="flex justify-center items-start min-h-screen px-4 py-10">
      <div className="w-full max-w-xl space-y-4">

        {/* Seed phrase card */}
        <Card className="bg-gray-800 border-gray-700 text-white">
          <CardHeader>
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-lime-400 w-5 h-5" />
              <span className="font-bold text-xl">Wallet Ready</span>
            </div>
            <p className="text-sm text-gray-400">Your seed phrase is saved. All wallets are linked to it.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <SeedGrid words={words} />
            <p className="text-xs text-gray-500 text-center">Hover over words to reveal</p>
          </CardContent>
          <CardFooter className="flex gap-3">
            <Button
              onClick={handleCopy}
              variant="outline"
              className="flex-1 bg-white border-gray-600 text-black  cursor-pointer"
            >
              {copied
                ? <><Check className="w-4 h-4 mr-2 text-lime-400" />Copied!</>
                : <><Copy className="w-4 h-4 mr-2" />Copy Phrase</>
              }
            </Button>
            <Button
              onClick={onReset}
              variant="destructive"
              className="flex-1 cursor-pointer"
            >
              Reset Wallet
            </Button>
          </CardFooter>
        </Card>

        {/* Network selector */}
        <NetworkSelector network={network} setNetwork={handleNetworkChange} />

        {/* Add wallet button */}
        <Button
          onClick={handleAddWallet}
          className="w-full bg-lime-500 hover:bg-lime-400 text-black font-semibold cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Wallet
        </Button>

        {/* Wallet list */}
        {wallets.map((wallet, i) => (
          <WalletCard key={i} wallet={wallet} index={i} network={network} />
        ))}

      </div>
    </div>
  );
};

export default WalletDashboard;