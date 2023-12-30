import React, { FC } from "react";
import RHFInput from "../Form/RHFinput";
import Form from "../Form";
import { useForm } from "react-hook-form";
import SocketApi from "@/api/socket-api";
import { Colors } from "@/models/Colors";

type JoinRoomComponentProps = {
  setStatus: (status: string) => void;
  userId: number;
  setRoomId: (roomId: string) => void;
  setColor: (color: string) => void;
};

const JoinRoomComponent: FC<JoinRoomComponentProps> = ({
  setRoomId,
  userId,
  setStatus,
  setColor,
}) => {
  const methods = useForm();
  const joinRoom = (data: { roomId: string }) => {
    SocketApi.socket?.emit("joinRoom", { roomId: data.roomId, userId });
    SocketApi.socket?.on("status", (statusMessage: string) => {
      if (statusMessage === "start game") {
        setRoomId(data.roomId);
        setColor(Colors.BLACK);
        setStatus(statusMessage);
      } else {
        alert(statusMessage);
      }
    });
  };
  return (
    <div className="cen">
      <div className="auth">
        <Form methods={methods} submitText="Join" onSubmit={joinRoom}>
          <RHFInput placeholder="room id" type="text" name="roomId" />
        </Form>
      </div>
    </div>
  );
};

export default JoinRoomComponent;
