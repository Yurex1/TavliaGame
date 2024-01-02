import { SocketApiType } from "@/hooks/useConnect";
import React, { FC  } from "react";

type CreateRoomProps = {
  socket: SocketApiType;
};

const CreateRoomComponent: FC<CreateRoomProps> = ({
  socket,
}) => {
  const [roomId, setRoomId] = React.useState<string | null>(null);


  return (
    <div className="cen">
      <div className="auth">
        <div onClick={() => {socket.createGame(setRoomId)}} className="btn">
          {" "}
          Get roomId
        </div>
        <input className="" defaultValue={roomId ? roomId : ""} />
      </div>
    </div>
  );
};

export default CreateRoomComponent;
