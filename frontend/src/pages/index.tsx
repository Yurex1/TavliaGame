import React from "react";
import Dropdown from "@/components/Dropdown";

export default function Home() {
  return (
    <>
      <div className="wrapper">
        <div className="games">
          <div className="main-game">
            <img className="game-img" src="board7x7.jpeg" alt="" />
            <Dropdown n={7} />
          </div>
          <div className="main-game">
            <img className="game-img" src="board9x9.jpeg" alt="" />
            <Dropdown n={9} />
          </div>
          <div className="main-game">
            <img className="game-img" src="board11x11.jpeg" alt="" />
            <Dropdown n={11} />
          </div>
        </div>
      </div>
    </>
  );
}
