import React from "react";
import Routes from "./routes";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <div>
      <Navbar />
      <Routes history />
    </div>
  );
}

export default App;
