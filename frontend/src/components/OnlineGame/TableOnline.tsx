import API_URL from "@/constants";
import { SocketApiType } from "@/hooks/useConnect";
import { Move } from "@/types/types";
import axios from "axios";
import React, { FC, useEffect } from "react";

type SchoreProps = {
  text: string;
};

const Schore: FC<SchoreProps> = ({ text }) => {
  return (
    <div className="schore">
      <div>{text}</div>
    </div>
  );
};

type HistoryProps = {
  array: Move[];
};

const History: FC<HistoryProps> = ({ array }) => {
  return (
    <div className="history">
      {array.map((item, id) => (
        <div key={id}>
          {item.from.x + 1}
          {String.fromCharCode(item.from.y + 65)} {item.to.x + 1}
          {String.fromCharCode(item.to.y + 65)}
        </div>
      ))}
    </div>
  );
};

type TableProps = {
  socket: SocketApiType;
  gameStatus: string | null;
  moverId: number | null;
  winerId: number | null;
};

const Table: FC<TableProps> = ({ socket, gameStatus, moverId, winerId }) => {
  const [white, setWhite] = React.useState<string>("");
  const [black, setBleck] = React.useState<string>("");
  const [mover, setMover] = React.useState<string>("");
  const whiteFun = async () => {
    const res = (await axios.get(`${API_URL}auth/${socket.whiteId}`)).data;
    setWhite(res.login);
  };
  whiteFun();
  const blackFun = async () => {
    const res = (await axios.get(`${API_URL}auth/${socket.blackId}`)).data;
    setBleck(res.login);
  };
  blackFun();
  const moverIdFun = async () => {
    const res = (await axios.get(`${API_URL}auth/${moverId}`)).data;
    setMover(res.login);
  };
  useEffect(() => {
    if(moverId)
    moverIdFun();
  }, [moverId])
  const whiteHistory: Move[] = [],
    blackHistory: Move[] = [];
  for (let i = 0; i < socket.history.length; i++) {
    if (i % 2 === 0) whiteHistory.push(socket.history[i]);
    else blackHistory.push(socket.history[i]);
  }
  return (
    <div className="table">
      <div className="row">
        {winerId ? (
          <div className="status">{winerId == socket.whiteId ? <>{white} win!</> : <>{black} win!</>} {gameStatus=="Player surrendered" && (winerId == socket.whiteId ? <>{black} surrendered!</> : <>{white} surrendered!</>)}</div>
        ) : (
          <div className="status">{mover} moving</div>
        )}
      </div>
      <div className="row">
        <Schore text={`White: ${white}` } />
        <Schore text={`Black: ${black}` } />
      </div>
      <div className="HISTORY">History:</div>
      <div className="row">
        <History array={whiteHistory} />
        <History array={blackHistory} />
      </div>
      <div onClick={socket.surrender} className="restart">
        Surrender
      </div>
    </div>
  );
};

export default Table;
