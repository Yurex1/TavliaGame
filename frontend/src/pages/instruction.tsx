import React from "react";

export default function Instruction() {
  return (
    <>
      <div className="instruction">
        <div className="wrapper">
          <div>
            <h1 className="title">Instructions</h1>

            <div className="section">
              <h3 className="subtitle">Basic Information About the Game</h3>
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
            <div className="section">
              <h3 className="subtitle">Game Mechanics</h3>
              <ol>
                <li>
                  The game is an imitation of how barbarians ambushed the king
                  with his defenders.
                  <div className="img-box">
                    <img className="img-ins" src="game_img.jpg" />
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
                  <div className="img-box">
                    <img className="img-ins" src="move.jpg" />
                  </div>
                </li>
                <li>
                  To capture an opponent`s piece, it must be surrounded with{" "}
                  <b>your</b> moves from two opposite sides.
                  <div className="img-box">
                    <img className="img-ins" src="kill-befour.jpg" />
                    <img className="img-ins" src="kill-after.jpg" />
                  </div>
                </li>
                <li>
                  The king wins if he escapes from the ambush, reaching one of
                  the 4 corner cells.
                  <div className="img-box">
                    <img className="img-ins" src="king-win.jpg" />
                  </div>
                </li>
                <li>No one, except the king, can occupy corner cells.</li>
                <li>
                  Barbarians win when they surround the king from all 4 sides
                  without the possibility of escape.
                  <div className="img-box">
                    <>Victory:</>
                  </div>
                  <div className="img-box">
                    <img className="img-ins" src="var-win.jpg" />
                  </div>
                  <br />
                  <div className="img-box">
                    <>Not Victory:</>
                  </div>
                  <div className="img-box">
                    <img className="img-ins" src="var-not-win.jpg" />
                    <img className="img-ins" src="var-not.jpg" />
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
