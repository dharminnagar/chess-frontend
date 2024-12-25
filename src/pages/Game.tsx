import { Chessboard } from "../components/Chessboard";

export function Game() {
  return (
    <div className="flex justify-center">
      <div className="pt-8 max-w-screen-lg w-full">
        <div className="grid grid-cols-6 gap-4 w-full">
          <div className="col-span-4 w-full bg-red-500">
            <Chessboard />
          </div>
          <div className="col-span-2 w-full">
            <button className="bg-green-500 hover:bg-green-700 transition-all w-full p-2 rounded-md">
              Play
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
