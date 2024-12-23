import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Landing } from "./pages/Landing";
import { Game } from "./pages/Game";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Add your routes here */}
        <Route path="/" element={<Landing />} />
        <Route path="/game" element={<Game />} />

        {/* This is the spectator endpoint */}
        {/* <Route path="/room/:id" element={<Room />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
