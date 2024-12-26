import { Chess } from "chess.js";
import { useEffect, useState } from "react";

export function MoveHistory({ chess }: { chess: Chess }) {
  const [moves, setMoves] = useState<string[]>(chess.history());
  const updateMoves = () => setMoves(chess.history());

  useEffect(() => {
    updateMoves();
  }, [chess.history().length]);
  console.log("Moves", moves);

  if (moves.length === 0) {
    return (
      <div>
        <h2 className="text-lg font-bold mb-2">Move History</h2>
        <div>No moves</div>
      </div>
    );
  }

  return (
    <div className="">
      <h2 className="text-lg font-bold mb-2 col-span-3">Move History</h2>
      {Array.from({ length: Math.ceil(moves.length / 2) }).map((_, i) => (
        <div key={i} className="grid grid-cols-6 text-s">
          <div className="col-span-1">{i + 1}.</div>
          <div className="col-span-2">{moves[i * 2] || ""}</div>
          <div className="col-span-2">{moves[i * 2 + 1] || ""}</div>
        </div>
      ))}
    </div>
  );
}
