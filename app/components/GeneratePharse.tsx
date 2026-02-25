"use client";

import { useState, useEffect } from "react";
import SeedPhrase from "./SeedPhrase";
import WalletDashboard from "./WalletDashboard";

const GeneratePhrase = () => {
  const [words, setWords] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const existing = localStorage.getItem("seedPhrase");
    if (existing) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setWords(existing.split(" "));
      setSaved(true);
    }
  }, []);

  function handleSave(newWords: string[]) {
    localStorage.setItem("seedPhrase", newWords.join(" "));
    setWords(newWords);
    setSaved(true);
  }

  function handleReset() {
    const yes = window.confirm("Are you sure? You will lose access to all wallets if you haven't saved your seed phrase.");
    if (yes) {
      localStorage.removeItem("seedPhrase");
      setWords([]);
      setSaved(false);
    }
  }

  if (saved) {
    return <WalletDashboard words={words} onReset={handleReset} />;
  }

  return <SeedPhrase onSave={handleSave} />;
};

export default GeneratePhrase;