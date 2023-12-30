import React, { FC } from "react";
import RHFInput from "../Form/RHFinput";
import Form from "../Form";
import { useForm } from "react-hook-form";
import SocketApi from "@/api/socket-api";
import { Colors } from "@/models/Colors";

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
