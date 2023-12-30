import { useConnect } from "@/hooks/useConnect";
import React, { FC } from "react";
import OnlineTavliaGame from "./OnlineTavliaGame";
import CreateRoomComponent from "./CreateRoomComponenet";
import { Colors } from "@/models/Colors";
import JoinRoomComponent from "./JoinRoomComponent";
import MainMenu from "./MainMenu";
import { Move } from "@/models/Game";

type OnlineGameProps = {
  n: number;
  userId: number;
};

const OnlineGame: FC<OnlineGameProps> = ({n, userId}) => {
  const [pageStatus, setPageStatus] = React.useState<string | null>(null);
  const [history, setHistory] = React.useState<Move[]>([]);
  const [moverId, setMoverId] = React.useState<number|null>(null);
  const [moveStatus, setMoveStatus] = React.useState<string>("can move");
  const socket = useConnect({n, userId, setPageStatus, setHistory, setMoverId, setMoveStatus});

  if (pageStatus === null)
    return (
      < MainMenu setStatus={setPageStatus} />
    );
  if (pageStatus === "create") {
    return (
      <CreateRoomComponent
        socket={socket}
      />
    );
  }
  if(pageStatus === "join"){
    return (
        <JoinRoomComponent socket = {socket} />
    );
  }
  if (pageStatus === "start game") {
    return <OnlineTavliaGame moveStatus={moveStatus} userId = {userId} moverId = {moverId} socket = {socket} history = {history}/>;
  }
  return <div className="cen">{pageStatus}</div>;
};

export default OnlineGame;
