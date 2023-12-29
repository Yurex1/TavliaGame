import { Status } from "@/models/Board";
import { Colors } from "@/models/Colors";
import { Move } from "@/models/Game";
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
          {item.fromX + 1}
          {String.fromCharCode(item.fromY + 65)} {item.toX + 1}
          {String.fromCharCode(item.toY + 65)}
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
      <div className="row">
        {status == Status.PLAYING && <div className="status">Move: {move}</div>}
        {status == Status.WIN && <div className="status">White win!</div>}
        {status == Status.LOSE && <div className="status">Black win!</div>}
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
      <div onClick={restart} className="restart">
        Restart
      </div>
    </div>
  );
};

export default Table;
