import React, { FC } from "react";
import RHFInput from "../Form/RHFinput";
import Form from "../Form";
import { useForm } from "react-hook-form";
import { SocketApiType } from "@/hooks/useConnect";
import gameData from "@/Data/Game";

type JoinRoomComponentProps = {
  socket: SocketApiType;
  restart: () => void;
};

const JoinRoomComponent: FC<JoinRoomComponentProps> = ({
  socket,
  restart,
}) => {
  const DTO = gameData();
  const methods = useForm();
  const joinRoom = (data: { roomId: string }) => {
    socket.joinRoom(data.roomId);
  };
  return (
    <div className="main-menu center column">
        <Form methods={methods} submitText={DTO.JoinRoom} onSubmit={joinRoom}>
          <RHFInput placeholder={DTO.RoomId} type="text" name="roomId" />
        </Form>
        <div onClick={restart} className="form-button center">{DTO.Back}</div>
    </div>
  );
};

export default JoinRoomComponent;
