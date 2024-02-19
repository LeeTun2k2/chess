import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes} from "react-router-dom";
import TestPage from "./pages/test";
import GamePage from "./pages/game";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<TestPage/>}/>
        <Route exact path="/game/:id" element={<GamePage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
