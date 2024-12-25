import { useEffect, useState } from "react";
import { Chessboard } from "../components/Chessboard";
import { useSocket } from "../hooks/useSocket";
import { Chess } from "chess.js";

// Move to another file, there's code repetition
export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export function Game() {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      switch (message.type) {
        case INIT_GAME:
          setChess(new Chess());
          setBoard(chess.board());
          console.log("Game Initialized");
          break;
        case MOVE:
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          console.log("Move", message.payload);
          break;
        case GAME_OVER:
          console.log("Game Over", message.payload);
          break;
        default:
          break;
      }
    };
  }, [socket]);

  if (!socket) return <div>Connecting...</div>;

  return (
    <div className="flex justify-center">
      <div className="pt-8 max-w-screen-lg w-full">
        <div className="grid grid-cols-6 gap-4 w-full">
          <div className="col-span-4 w-full flex items-center">
            <Chessboard board={board} />
          </div>
          <div className="col-span-2 w-full">
            <button
              className="bg-green-500 hover:bg-green-700 transition-all w-full p-2 rounded-md"
              onClick={() => {
                socket.send(
                  JSON.stringify({
                    type: INIT_GAME,
                  })
                );
              }}
            >
              Play
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
