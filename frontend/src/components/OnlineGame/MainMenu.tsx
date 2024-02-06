import gameData from "@/Data/Game";
import React, { FC } from "react";

type MainMenuProps = {
 setStatus: (status: string) => void;
};

const MainMenu: FC<MainMenuProps> = ({setStatus}) => {
  const DTO = gameData();
  return(
    <div className="main-menu center column">
        <div
          className="form-button center"
          onClick={() => {
            setStatus("create");
          }}
        >
          {DTO.CreateRoom}
        </div>
        <div
          className="form-button center"
          onClick={() => {
            setStatus("join");
          }}
        >
          {DTO.JoinRoom}
        </div>
      </div>
  );
};

export default MainMenu;
