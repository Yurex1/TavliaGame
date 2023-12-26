import { Status } from "@/models/Board";
import { Colors } from "@/models/Colors";
import { Move } from "@/models/Game";
import { Square } from "@/models/Square";
import { FC } from "react";

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
      {array.map((item) => (
        <div>
            {item.from.x + 1}{String.fromCharCode(item.from.y + 65)} {item.to.x + 1}{String.fromCharCode(item.to.y + 65)} 
        </div>
      ))}
    </div>
  );
};

type TableProps = {
  history: Move[];
  move: Colors;
  status: Status;
};

const Table: FC<TableProps> = ({ history, move, status }) => {
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
    </div>
  );
};

export default Table;
