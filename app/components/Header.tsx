"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Wallet } from "lucide-react";
import { useState } from "react";

function Header() {
  const [network, setNetwork] = useState("solana");

  return (
    <header className="h-16 flex justify-between items-center px-6 border-b border-gray-700 bg-gray-900 sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Wallet className="text-lime-400 w-6 h-6" />
        <span className="font-bold text-xl text-white tracking-tight">
          Wal<span className="text-lime-400">lo</span>
        </span>
      </div>

      {/* Network Selector */}
      <Select value={network} onValueChange={setNetwork}>
        <SelectTrigger className="w-36 bg-gray-800 border-gray-600 text-white cursor-pointer">
          <SelectValue />
        </SelectTrigger>
        <SelectContent
          className="bg-gray-800 border-gray-600 text-white"
          side="bottom"
          sideOffset={4}
        >
          <SelectGroup>
            <SelectItem
              value="solana"
              className="cursor-pointer hover:bg-gray-700 focus:bg-gray-700 focus:text-lime-400"
            >
              Solana
            </SelectItem>
            <SelectItem
              value="ethereum"
              className="cursor-pointer hover:bg-gray-700 focus:bg-gray-700 focus:text-lime-400"
            >
              Ethereum
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </header>
  );
}

export default Header;
