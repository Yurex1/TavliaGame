import { Status } from "@/models/Board";
import { Colors } from "@/models/Colors";
import { Move } from "@/types/types";
import React, { FC } from "react";

type SchoreProps = {
  text: string;
};

const Schore: FC<SchoreProps> = ({ text }) => {
  return (
    <div className="table-schore">
      <div className="text">{text}</div>
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
  history: Move[];
  move: Colors;
  status: Status;
  restart: () => void;
};

const Table: FC<TableProps> = ({ history, move, status, restart }) => {
  const whiteHistory: Move[] = [],
    blackHistory: Move[] = [];
  for (let i = 0; i < history.length; i++) {
    if (i % 2 === 0) whiteHistory.push(history[i]);
    else blackHistory.push(history[i]);
  }
  return (
    <div className="table">
      <div className="table-row">
        {status == Status.PLAYING && <div className="table-status">Move: {move}</div>}
        {status == Status.WIN && <div className="table-status">White win!</div>}
        {status == Status.LOSE && <div className="table-status">Black win!</div>}
      </div>
      <div className="table-row">
        <Schore text="White" />
        <Schore text="Black" />
      </div>
      <div className="table-status">History:</div>
      <div className="table-row h-100">
        <History array={whiteHistory} />
        <History array={blackHistory} />
      </div>
      <div onClick={restart} className="table-button">
        Restart
      </div>
    </div>
  );
};

export default Table;
