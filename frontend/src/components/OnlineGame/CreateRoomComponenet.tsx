import SocketApi from "@/api/socket-api";
import { Colors } from "@/models/Colors";
import React, { FC } from "react";

type CreateRoomProps = {
  n: number;
  userId: number;
  roomId: string | null;
  setRoomId: (roomId: string) => void;
  setStatus: (status: string) => void;
  setColor: (color: string) => void;
};

const CreateRoomComponent: FC<CreateRoomProps> = ({
  n,
  userId,
  roomId,
  setRoomId,
  setStatus,
  setColor,
}) => {
    
  const CreateRoom = () => {
    const requestData = {
      n: n,
      userId: userId,
    };
    SocketApi.socket?.emit("createRoom", requestData);
    SocketApi.socket?.on("getRoomId", (roomId: string) => {
      setRoomId(roomId);
    });
    SocketApi.socket?.on("status", (statusMessage: string) => {
        setStatus(statusMessage);
        setColor(Colors.WHITE);
    });
  };

  return (
    <div className="cen">
      <div onClick={CreateRoom} className="btn"> get roomId</div>
      <input defaultValue={roomId ? roomId : ""} />
    </div>
  );
};

export default CreateRoomComponent;
