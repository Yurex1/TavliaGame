import { useConnect } from "@/hooks/useConnect";
import React, { FC } from "react";
import OnlineTavliaGame from "./OnlineTavliaGame";
import CreateRoomComponent from "./CreateRoomComponenet";
import JoinRoomComponent from "./JoinRoomComponent";
import MainMenu from "./MainMenu";
import { Move } from "@/types/types";

type OnlineGameProps = {
  n: number;
  userId: number;
};

const OnlineGame: FC<OnlineGameProps> = ({ n, userId }) => {
  const [gameStatus, setGameStatus] = React.useState<string | null>(null);
  const [winerId, setWinerId] = React.useState<number | null>(null);
  const [pageStatus, setPageStatus] = React.useState<string | null>(null);
  const [history, setHistory] = React.useState<Move[]>([]);
  const [moverId, setMoverId] = React.useState<number | null>(null);
  const [moveStatus, setMoveStatus] = React.useState<string>("can move");
  const socket = useConnect({
    setWinerId,
    n,
    userId,
    setPageStatus,
    setHistory,
    setMoverId,
    setMoveStatus,
    setGameStatus,
  });

  const restart = () => {
    setGameStatus(null);
    setWinerId(null);
    setPageStatus(null);
    setHistory([]);
    setMoverId(null);
    setMoveStatus("can move");
  };

  if (pageStatus === null) return <MainMenu setStatus={setPageStatus} />;
  if (pageStatus === "create") {
    return <CreateRoomComponent socket={socket} restart={restart}/>;
  }
  if (pageStatus === "join") {
    return <JoinRoomComponent socket={socket} restart={restart} />;
  }
  if (pageStatus === "start game") {
    return (
      <OnlineTavliaGame
        winerId={winerId}
        gameStatus={gameStatus}
        moveStatus={moveStatus}
        userId={userId}
        moverId={moverId}
        socket={socket}
        history={history}
      />
    );
  }
  return (
    <>
      <div className="message">
        {pageStatus}
        <div onClick={restart} className="form-button center">
          Back
        </div>
      </div>
    </>
  );
};

export default OnlineGame;
