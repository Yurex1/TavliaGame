import gameData from "@/Data/Game";
import { SocketApiType } from "@/hooks/useConnect";
import React, { FC } from "react";

type CreateRoomProps = {
  socket: SocketApiType;
  restart: () => void;
};

const CreateRoomComponent: FC<CreateRoomProps> = ({ socket, restart }) => {
  const [roomId, setRoomId] = React.useState<string | null>(null);
  const DTO = gameData();

  return (
    <div className="main-menu center column">
      <div
        onClick={() => {
          socket.createGame(setRoomId);
        }}
        className="form-button center"
      >
        {DTO.GetRoomId}
      </div>
      <input
        placeholder={DTO.RoomId}
        className=""
        defaultValue={roomId ? roomId : ""}
      />
      <div onClick={restart} className="form-button center">
        {DTO.Back}
      </div>
    </div>
  );
};

export default CreateRoomComponent;
