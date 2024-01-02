import { SocketApiType } from "@/hooks/useConnect";
import React, { FC  } from "react";

type CreateRoomProps = {
  socket: SocketApiType;
  restart: () => void;
};

const CreateRoomComponent: FC<CreateRoomProps> = ({
  socket,
  restart,
}) => {
  const [roomId, setRoomId] = React.useState<string | null>(null);


  return (
    <div className="main-menu center column">

        <div onClick={() => {socket.createGame(setRoomId)}} className="form-button center">
          {" "}
          Get roomId
        </div>
        <input className="" defaultValue={roomId ? roomId : ""} />
        <div onClick={restart} className="form-button center">Back</div>
    </div>
  );
};

export default CreateRoomComponent;
