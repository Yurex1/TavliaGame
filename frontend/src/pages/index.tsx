import React from "react";
import Dropdown from "../components/Dropdown";

export default function Home() {
  return (
    <>
      <div className="games center">
        <div className="main-game">
          <img className="game-imgares center" src="index/board7x7.jpeg" alt="" />
          <Dropdown n={7} />
        </div>
        <div className="main-game">
          <img className="game-imgares center" src="index/board9x9.jpeg" alt="" />
          <Dropdown n={9} />
        </div>
        <div className="main-game">
          <img className="game-imgares center" src="index/board11x11.jpeg" alt="" />
          <Dropdown n={11} />
        </div>
      </div>
    </>
  );
}
