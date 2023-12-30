import { SocketApiType } from "@/hooks/useConnect";
import React, { FC } from "react";

type CreateRoomProps = {
  socket: SocketApiType;
};

const CreateRoomComponent: FC<CreateRoomProps> = ({
  socket,
}) => {

  return (
    <div className="cen">
      <div className="auth">
        <div onClick={socket.createGame} className="btn">
          {" "}
          Get roomId
        </div>
        <input className="" defaultValue={socket.roomId ? socket.roomId : ""} />
      </div>
    </div>
  );
};

export default CreateRoomComponent;
