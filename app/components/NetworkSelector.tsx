type Props = {
  network: "solana" | "ethereum";
  setNetwork: (n: "solana" | "ethereum") => void;
};

const NetworkSelector = ({ network, setNetwork }: Props) => {
  return (
    <div className="flex gap-3">
      <button
        onClick={() => setNetwork("solana")}
        className={`flex-1 py-2 rounded-lg font-semibold cursor-pointer transition-colors ${
          network === "solana"
            ? "bg-lime-500 text-black"
            : "bg-gray-700 text-white hover:bg-gray-600"
        }`}
      >
        Solana
      </button>
      <button
        onClick={() => setNetwork("ethereum")}
        className={`flex-1 py-2 rounded-lg font-semibold cursor-pointer transition-colors ${
          network === "ethereum"
            ? "bg-lime-500 text-black"
            : "bg-gray-700 text-white hover:bg-gray-600"
        }`}
      >
        Ethereum
      </button>
    </div>
  );
};

export default NetworkSelector;