import React, { FC } from "react";
import RHFInput from "../Form/RHFinput";
import Form from "../Form";
import { useForm } from "react-hook-form";
import { SocketApiType } from "@/hooks/useConnect";

type JoinRoomComponentProps = {
  socket: SocketApiType;
};

const JoinRoomComponent: FC<JoinRoomComponentProps> = ({
  socket
}) => {
  const methods = useForm();
  const joinRoom = (data: { roomId: string }) => {
    socket.joinRoom(data.roomId);
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
