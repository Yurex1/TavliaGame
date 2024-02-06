import { Move } from "@/types/types";
import { Board, Status } from "./Board";
import { Colors } from "./Colors";
import { Figure } from "./figures/Figure";

export class Game {
  readonly n: number;
  color: Colors;
  history: Move[] = [];
  king: Figure | null = null;
  status = Status.PLAYING;
  board: Board;
  constructor(n: number, history: Move[] = []) {
    this.n = n;
    this.color = Colors.WHITE;
    this.board = new Board(n, this);
    if (n) {
      this.king =
        this.board.squares[(this.n - 1) / 2][(this.n - 1) / 2].figure!;
      history.map((move) => {
        const from = this.board.getSquare(move.from.x, move.from.y);
        const to = this.board.getSquare(move.to.x, move.to.y);
        from.moveFigure(to);
      });
    }
  }

  public changeColor() {
    this.color == Colors.WHITE
      ? (this.color = Colors.BLACK)
      : (this.color = Colors.WHITE);
  }
}
