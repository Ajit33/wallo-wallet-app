"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Lock, Copy, Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import generateSeed from "@/utils/generateSeed";

const GeneratePhrase = () => {
  const [words, setWords] = useState<string[]>([]);
  const [confirmed, setConfirmed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  // On page load — check if seed already exists
  useEffect(() => {
    const existing = localStorage.getItem("seedPhrase");
    if (existing) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setWords(existing.split(" "));
      setSaved(true);
    }
  }, []);

  function handleGenerate() {
    const wordList = generateSeed(128);
    setWords(wordList.split(" "));
  }

  function handleCopy() {
    navigator.clipboard.writeText(words.join(" "));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleConfirm() {
    localStorage.setItem("seedPhrase", words.join(" "));
    setSaved(true);
  }

  function handleReset() {
    const yes = window.confirm("Are you sure? You will lose access to all wallets if you haven't saved your seed phrase.");
    if (yes) {
      localStorage.removeItem("seedPhrase");
      setWords([]);
      setSaved(false);
      setConfirmed(false);
    }
  }

  // ── Saved screen ──
  if (saved) {
    return (
      <div className="flex justify-center items-center min-h-screen px-4">
        <Card className="bg-gray-800 border-gray-700 text-white w-full max-w-xl">

          <CardHeader>
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-lime-400 w-5 h-5" />
              <span className="font-bold text-xl">Wallet Ready</span>
            </div>
            <p className="text-sm text-gray-400">Your seed phrase is saved. All wallets are linked to it.</p>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {words.map((word, i) => (
                <div key={i} className="bg-gray-700 rounded-lg px-3 py-2 flex items-center gap-2 border border-gray-600 h-10">
                  <span className="text-xs text-gray-600 w-4">{i + 1}.</span>
                  <span className="text-sm font-semibold blur-sm hover:blur-none transition-all duration-300 select-none">
                    {word}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 text-center">Hover over words to reveal</p>
          </CardContent>

          <CardFooter className="flex gap-3">
            <Button
              onClick={handleCopy}
              variant="outline"
              className="flex-1 border-gray-600 text-black hover:bg-gray-700 cursor-pointer"
            >
              {copied
                ? <><Check className="w-4 h-4 mr-2 text-lime-400" />Copied!</>
                : <><Copy className="w-4 h-4 mr-2" />Copy Phrase</>
              }
            </Button>
            <Button
              onClick={handleReset}
              variant="destructive"
              className="flex-1 cursor-pointer"
            >
              Reset Wallet
            </Button>
          </CardFooter>

        </Card>
      </div>
    );
  }

  // ── First time screen ──
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

          <div className="grid grid-cols-3 gap-2">
            {words.length > 0 ? (
              words.map((word, i) => (
                <div key={i} className="bg-gray-700 rounded-lg px-3 py-2 flex items-center gap-2 border border-gray-600 h-10 hover:border-lime-500 transition-colors">
                  <span className="text-xs text-gray-600 w-4">{i + 1}.</span>
                  <span className="text-sm font-semibold text-white">{word}</span>
                </div>
              ))
            ) : (
              Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="bg-gray-700 rounded-lg px-3 py-2 flex items-center gap-2 border border-gray-600 h-10">
                  <span className="text-xs text-gray-600 w-4">{i + 1}.</span>
                  <div className="h-3 w-16 bg-gray-600 rounded animate-pulse"></div>
                </div>
              ))
            )}
          </div>

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
                className="flex-1 border-gray-600 text-black hover:bg-gray-700 cursor-pointer"
              >
                {copied
                  ? <><Check className="w-4 h-4 mr-2 text-lime-400" />Copied!</>
                  : <><Copy className="w-4 h-4 mr-2" />Copy Phrase</>
                }
              </Button>
              <Button
                onClick={handleConfirm}
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

export default GeneratePhrase;