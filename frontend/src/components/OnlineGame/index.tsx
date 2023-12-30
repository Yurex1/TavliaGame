import { useConnect } from "@/hooks/useConnect";
import React, { FC } from "react";
import OnlineTavliaGame from "./OnlineTavliaGame";
import CreateRoomComponent from "./CreateRoomComponenet";
import { Colors } from "@/models/Colors";
import JoinRoomComponent from "./JoinRoomComponent";
import MainMenu from "./MainMenu";

type OnlineGameProps = {
  n: number;
};

const OnlineGame: FC<OnlineGameProps> = ({n}) => {
  const socket = useConnect(n);
  const [status, setStatus] = React.useState<string | null>(null);

  if (status === null)
    return (
      < MainMenu setStatus={setStatus} />
    );
  if (status === "create") {
    return (
      <CreateRoomComponent
        socket={socket}
      />
    );
  }
  if(status === "join"){
    return (
        <JoinRoomComponent socket = {socket} />
    );
  }
  if (status === "start game") {
    return <OnlineTavliaGame socket = {socket}/>;
  }
};

export default OnlineGame;
