import SocketApi from "@/api/socket-api";
import { useConnect } from "@/hooks/useConnect";
import React, { FC } from "react";
import OnlineTavliaGame from "./OnlineTavliaGame";
import CreateRoomComponent from "./CreateRoomComponenet";
import useUser from "@/hooks/useUser";
import { Colors } from "@/models/Colors";
import JoinRoomComponent from "./JoinRoomComponent";

type OnlineGameProps = {
  n: number;
  userId: number;
  username: string;
};

const OnlineGame: FC<OnlineGameProps> = ({ n, userId, username }) => {
  useConnect();
  const [roomId, setRoomId] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<string | null>(null);
  const [color, setColor] = React.useState<string>(Colors.EMPTY);

  if (status === null)
    return (
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
    return <OnlineTavliaGame roomId = {roomId} userId = {userId} n = {n} color={color}/>;
  }
};

export default OnlineGame;
