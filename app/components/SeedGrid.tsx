const SeedGrid = ({ words }: { words: string[] }) => {
  return (
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
  );
};

export default SeedGrid;