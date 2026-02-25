"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Lock, Copy, Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import generateSeed from "@/utils/generateSeed";
import SeedGrid from "./SeedGrid";

type Props = {
  onSave: (words: string[]) => void;
};

const SeedPhrase = ({ onSave }: Props) => {
  const [words, setWords] = useState<string[]>([]);
  const [confirmed, setConfirmed] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleGenerate() {
    setWords(generateSeed(128).split(" "));
  }

  function handleCopy() {
    navigator.clipboard.writeText(words.join(" "));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <Card className="bg-gray-800 border-gray-700 text-white w-full max-w-xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="text-lime-400 w-5 h-5" />
            <span className="font-bold text-xl">Create Your Wallet</span>
          </div>
          <p className="text-sm text-gray-400">Generate a seed phrase to get started</p>
        </CardHeader>

        <CardContent className="space-y-4">
          <Alert className="border-yellow-600 bg-yellow-950/50">
            <AlertTriangle className="text-yellow-400 h-4 w-4" />
            <AlertDescription className="text-yellow-300 text-sm ml-2">
              Never share your seed phrase. Anyone with these words has full access to your wallet.
            </AlertDescription>
          </Alert>

          <SeedGrid words={words} />

          {words.length > 0 && (
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="w-4 h-4 accent-lime-400 cursor-pointer"
              />
              <span className="text-sm text-gray-300">
                I have saved my seed phrase somewhere secure
              </span>
            </label>
          )}
        </CardContent>

        <CardFooter className="flex gap-3 pt-2">
          {words.length === 0 ? (
            <Button
              onClick={handleGenerate}
              className="w-full bg-lime-500 hover:bg-lime-400 text-black font-semibold cursor-pointer"
            >
              <Lock className="w-4 h-4 mr-2" />
              Generate Seed Phrase
            </Button>
          ) : (
            <>
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
                onClick={() => onSave(words)}
                disabled={!confirmed}
                className="flex-1 bg-lime-500 hover:bg-lime-400 text-black font-semibold disabled:opacity-40 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 mr-2" />
                Save & Continue
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default SeedPhrase;