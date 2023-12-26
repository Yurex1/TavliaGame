import { Board, Status } from "./Board";
import { Colors } from "./Colors";
import { Square } from "./Square";
import { Figure } from "./figures/Figure";

export type Move = {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
};

export class Game {
  readonly n: number;
  color: Colors;
  history: Move[] = [];
  king: Figure | null = null;
  status = Status.PLAYING;
  board: Board;
  constructor(n: number) {
    this.n = n;
    this.color = Colors.WHITE;
    this.board = new Board(n, this);
    if (n)
      this.king =
        this.board.squares[(this.n - 1) / 2][(this.n - 1) / 2].figure!;
  }

  public changeColor() {
    this.color == Colors.WHITE
      ? (this.color = Colors.BLACK)
      : (this.color = Colors.WHITE);
  }
}
