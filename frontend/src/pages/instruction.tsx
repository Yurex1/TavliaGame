import React from "react";

export default function Instruction() {
  return (
    <>
      <div className="instruction">
        <div className="instruction-wrapper">
          <div>
            <h1 className="instruction-title">Instructions</h1>

            <div className="instruction-section">
              <h3 className="instruction-subtitle">Basic Information About the Game</h3>
              <ol>
                <li>
                  Tavliya is one of the oldest board games, originating from
                  Scandinavia. Unfortunately, the exact rules of the game have
                  not survived to our times, so we will use some of the most
                  probable ones.
                </li>
                <li>
                  Different board sizes are used for the game: 7x7, 9x9, and
                  11x11.
                </li>
                <li>
                  Regardless of the board size, the rules of the game are the
                  same.
                </li>
              </ol>
            </div>
            <div className="instruction-section">
              <h3 className="instruction-subtitle">Game Mechanics</h3>
              <ol>
                <li>
                  The game is an imitation of how barbarians ambushed the king
                  with his defenders.
                  <div className="center">
                    <img className="instruction-image" src="instruction/game-board.jpg" />
                  </div>
                </li>
                <li>The game starts with the king.</li>
                <li>
                  The king is placed in the center of the board, surrounded by
                  his knights.
                </li>
                <li>
                  Barbarians are positioned on four sides of the board, with
                  twice the number of barbarians compared to knights.
                </li>
                <li>
                  <b>All</b> pieces move horizontally or vertically to any
                  number of free cells.
                  <div className="center">
                    <img className="instruction-image" src="instruction/move.jpg" />
                  </div>
                </li>
                <li>
                  To capture an opponent`s piece, it must be surrounded with{" "}
                  <b>your</b> moves from two opposite sides.
                  <div className="center">
                    <img className="instruction-image" src="instruction/kill-before.jpg" />
                    <img className="instruction-image" src="instruction/kill-after.jpg" />
                  </div>
                </li>
                <li>
                  The king wins if he escapes from the ambush, reaching one of
                  the 4 corner cells.
                  <div className="center">
                    <img className="instruction-image" src="instruction/king-win.jpg" />
                  </div>
                </li>
                <li>No one, except the king, can occupy corner cells.</li>
                <li>
                  Barbarians win when they surround the king from all 4 sides.
                  <div className="center">
                    <img className="instruction-image" src="instruction/black-win.jpg" />
                  </div>
                </li>
                <li>Being unable to make a move is a loss.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
