import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  wallet: { publicKey: string; privateKey: string };
  index: number;
  network: "solana" | "ethereum";
};

const WalletCard = ({ wallet, index, network }: Props) => {
  const [showPrivateKey, setShowPrivateKey] = useState(false);

  return (
    <Card className="bg-gray-800 border-gray-700 text-white">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <span className="font-bold text-lime-400">Wallet {index + 1}</span>
          <span className="text-xs text-gray-500 capitalize">{network}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-xs text-gray-400 mb-1">Public Key / Address</p>
          <p className="font-mono text-xs break-all bg-gray-900 p-2 rounded border border-gray-700">
            {wallet.publicKey}
          </p>
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-gray-400">Private Key</p>
            <button
              onClick={() => setShowPrivateKey(!showPrivateKey)}
              className="text-xs text-gray-500 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              {showPrivateKey
                ? <><EyeOff className="w-3 h-3" /> Hide</>
                : <><Eye className="w-3 h-3" /> Show</>
              }
            </button>
          </div>
          <p className="font-mono text-xs break-all bg-gray-900 p-2 rounded border border-gray-700">
            {showPrivateKey ? wallet.privateKey : "••••••••••••••••••••••••••••••••"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletCard;