import { SocketApiType } from "@/hooks/useConnect";
import { Move } from "@/types/types";
import React, { FC } from "react";

type SchoreProps = {
  text: string;
};

const Schore: FC<SchoreProps> = ({ text }) => {
  return (
    <div className="schore">
      <div className="text">{text}</div>
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
};

const Table: FC<TableProps> = ({ socket }) => {
  const whiteHistory: Move[] = [],
    blackHistory: Move[] = [];
  for (let i = 0; i < socket.history.length; i++) {
    if (i % 2 === 0) whiteHistory.push(socket.history[i]);
    else blackHistory.push(socket.history[i]);
  }
  return (
    <div className="table">
      <div className="row">
        {socket.status == "End of Game" ? <div className="status">{socket.status}</div> : <div className="status">{socket.moverId} moving</div>}
        
      </div>
      <div className="row">
        <Schore text="White" />
        <Schore text="Black" />
      </div>
      <div className="HISTORY">History:</div>
      <div className="row">
        <History array={whiteHistory} />
        <History array={blackHistory} />
      </div>
      <div className="restart">Surrender</div>
    </div>
  );
};

export default Table;
