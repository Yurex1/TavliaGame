import React, { FC } from "react";

type MainMenuProps = {
 setStatus: (status: string) => void;
};

const MainMenu: FC<MainMenuProps> = ({setStatus}) => {
  return(
    <div className="cen">
        <div
          className="btn"
          onClick={() => {
            setStatus("create");
          }}
        >
          Create Game
        </div>
        <div
          className="btn"
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
