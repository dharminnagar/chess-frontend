import { Color, PieceSymbol, Square } from "chess.js";
import { Piece, PieceProps } from "@chessire/pieces";
import { useState } from "react";
import { MOVE } from "../pages/Game";

export function Chessboard({
  board,
  playerColor,
  socket,
}: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  playerColor: Color;
  socket: WebSocket;
}) {
  const [from, setFrom] = useState<Square | null>(null);
  const [to, setTo] = useState<Square | null>(null);

  return (
    <div>
      {board.map((row, i) => {
        return (
          <div key={i} className="flex">
            {row.map((square, j) => {
              const squareRepresentation = // TODO: Check this ASAP!
                playerColor === "w"
                  ? ((String.fromCharCode(97 + (j % 8)) +
                      String(8 - i)) as Square)
                  : ((String.fromCharCode(97 + (7 - (j % 8))) +
                      String(i + 1)) as Square);
              return (
                <div
                  key={j}
                  className={`w-20 h-20 ${
                    (i + j) % 2 ? "bg-green-800" : "bg-green-200"
                  }`}
                >
                  <div
                    className={`text-s font-bold pl-[0.5px] absolute ${
                      i % 2 === 0 ? "text-green-800" : "text-green-200"
                    }`}
                  >
                    {j === 0 ? 8 - i : ""}
                  </div>
                  <div
                    className="flex justify-center items-center h-20"
                    onClick={() => {
                      if (!from) {
                        setFrom(squareRepresentation);
                        console.log("From", squareRepresentation);
                      } else {
                        // setTo(square?.square ?? null);
                        console.log("To", squareRepresentation);
                        const payload = JSON.stringify({
                          type: MOVE,
                          move: {
                            from: from,
                            to: squareRepresentation,
                          },
                        });
                        console.log("Payload", payload);
                        socket.send(
                          JSON.stringify({
                            type: MOVE,
                            move: {
                              from: from,
                              to: squareRepresentation,
                            },
                          })
                        );

                        setFrom(null);
                        setTo(null);
                      }
                    }}
                  >
                    {square ? (
                      // @ts-ignore
                      <Piece
                        color={square.color === "w" ? "white" : "black"}
                        piece={square.type.toUpperCase() as PieceProps["piece"]}
                        width={72}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="text-s font-bold pl-1">
                    {i === 7 ? String.fromCharCode(97 + j) : ""}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
