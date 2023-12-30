import { useConnect } from "@/hooks/useConnect";
import React, { FC } from "react";
import OnlineTavliaGame from "./OnlineTavliaGame";
import CreateRoomComponent from "./CreateRoomComponenet";
import { Colors } from "@/models/Colors";
import JoinRoomComponent from "./JoinRoomComponent";
import { Game } from "@/models/Game";
import MainMenu from "./MainMenu";

type OnlineGameProps = {
  n: number;
  userId: number;
  username: string;
};

const OnlineGame: FC<OnlineGameProps> = ({ n, userId}) => {
  useConnect();
  const [roomId, setRoomId] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<string | null>(null);
  const [color, setColor] = React.useState<string>(Colors.EMPTY);
  const [game, setGame] = React.useState<Game>(new Game(n));

  if (status === null)
    return (
      < MainMenu setStatus={setStatus} />
    );
  if (status === "create") {
    return (
      <CreateRoomComponent
        n={n}
        setRoomId={setRoomId}
        setStatus={setStatus}
        roomId={roomId}
        userId={userId}
        setColor={setColor}
      />
    );
  }
  if(status === "join"){
    return (
        <JoinRoomComponent userId={userId} setColor={setColor} setRoomId={setRoomId} setStatus={setStatus}/>
    );
  }
  if (status === "start game") {
    return <OnlineTavliaGame game = {game} setGame = {setGame} roomId = {roomId} userId = {userId} n = {n} color={color}/>;
  }
};

export default OnlineGame;
