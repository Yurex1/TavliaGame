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
    <div className="table-schore center">
      <div>{text}</div>
    </div>
  );
};

type HistoryProps = {
  array: Move[];
};

const History: FC<HistoryProps> = ({ array }) => {
  return (
    <div className="table-history">
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
    const res = (
      await axios.get(`${API_URL}auth/${socket.whiteId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")?.toString(),
        },
      })
    ).data;
    setWhite(res.login);
  };
  whiteFun();
  const blackFun = async () => {
    const res = (
      await axios.get(`${API_URL}auth/${socket.blackId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")?.toString(),
        },
      })
    ).data;
    setBleck(res.login);
  };
  blackFun();
  const moverIdFun = async () => {
    const res = (
      await axios.get(`${API_URL}auth/${moverId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")?.toString(),
        },
      })
    ).data;
    setMover(res.login);
  };
  useEffect(() => {
    if (moverId) moverIdFun();
  }, [moverId]);
  const whiteHistory: Move[] = [],
    blackHistory: Move[] = [];
  for (let i = 0; i < socket.history.length; i++) {
    if (i % 2 === 0) whiteHistory.push(socket.history[i]);
    else blackHistory.push(socket.history[i]);
  }
  return (
    <div className="table">
      {winerId ? (
        <div className="table-status center">
          {winerId == socket.whiteId ? <>{white} win !</> : <>{black} win! </>}

          {gameStatus == "surrender" ? (
            <>
              <br />
              {winerId == socket.whiteId ? <>{black} surrendered!</> : <>{white} surrendered!</>}
            </>
          ):null}
        </div>
      ) : (
        <div className="table-status">{mover} moving</div>
      )}
      <div className="table-row">
        <Schore text={`White: ${white}`} />
        <Schore text={`Black: ${black}`} />
      </div>
      <div className="table-status">History:</div>
      <div className="table-row one">
        <History array={whiteHistory} />
        <History array={blackHistory} />
      </div>
      <div onClick={socket.surrender} className="table-button">
        Surrender
      </div>
    </div>
  );
};

export default Table;
