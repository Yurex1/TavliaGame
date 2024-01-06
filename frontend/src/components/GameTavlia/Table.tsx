import gameData from "@/Data/Game";
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
  const DTO = gameData().Table;
  return (
    <div className="table">
      {status == Status.PLAYING && (
        <div className="table-status">{move == Colors.BLACK ? DTO.Black : DTO.White} {DTO.Moveing}</div>
      )}
      {status == Status.WIN && <div className="table-status">{DTO.WhiteWin}</div>}
      {status == Status.LOSE && <div className="table-status">{DTO.BlackWin}</div>}
      <div className="table-row">
        <Schore text={DTO.White} />
        <Schore text={DTO.Black} />
      </div>
      <div className="table-status">{DTO.GameHistory}</div>
      <div className="table-row one">
        <History array={whiteHistory} />
        <History array={blackHistory} />
      </div>
      <div onClick={restart} className="table-button">
        {DTO.RestartGame}
      </div>
    </div>
  );
};

export default Table;
