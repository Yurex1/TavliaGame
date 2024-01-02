import React, { FC } from "react";

type MainMenuProps = {
 setStatus: (status: string) => void;
};

const MainMenu: FC<MainMenuProps> = ({setStatus}) => {
  return(
    <div className="main-menu center column">
        <div
          className="game-button center"
          onClick={() => {
            setStatus("create");
          }}
        >
          Create Game
        </div>
        <div
          className="game-button center"
          onClick={() => {
            setStatus("join");
          }}
        >
          Join Game
        </div>
      </div>
  );
};

export default MainMenu;
