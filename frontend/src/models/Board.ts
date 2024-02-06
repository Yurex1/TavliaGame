import { Square } from "./Square";
import { Colors } from "./Colors";
import { King } from "./figures/King";
import { Target } from "./figures/Target";
import { Helper } from "./figures/Helper";
import { Game } from "./Game";
import { FigureNames } from "./figures/Figure";

export enum Status {
  PLAYING = "playing",
  WIN = "win",
  LOSE = "lose",
}
export class Board {
  readonly n: number;
  readonly game: Game;
  squares: Square[][] = [];

  constructor(n: number, game: Game) {
    this.game = game;
    this.n = n;
    for (let i = 0; i < this.n; i++) {
      const row: Square[] = [];
      for (let j = 0; j < this.n; j++) {
        if ((i == 0 || i == this.n - 1) && (j == 0 || j == this.n - 1))
          row.push(new Square(this, i, j, Colors.FINISH, null));
        else if (
          (i == 0 || i == this.n - 1 || j == 0 || j == this.n - 1) &&
          ((i > 2 && i < this.n - 3) || (j > 2 && j < this.n - 3))
        )
          row.push(new Square(this, i, j, Colors.TARGET, null));
        else if (
          (i == (this.n - 1) / 2 && (j == 1 || j == this.n - 2)) ||
          (j == (this.n - 1) / 2 && (i == 1 || i == this.n - 2))
        )
          row.push(new Square(this, i, j, Colors.TARGET, null));
        else if (i == (this.n - 1) / 2 && j == (this.n - 1) / 2)
          row.push(new Square(this, i, j, Colors.START, null));
        else if (
          (i == (this.n - 1) / 2 &&
            j > (this.n - 1) / 2 - 3 &&
            j < (this.n - 1) / 2 + 3) ||
          (j == (this.n - 1) / 2 &&
            i > (this.n - 1) / 2 - 3 &&
            i < (this.n - 1) / 2 + 3)
        )
          row.push(new Square(this, i, j, Colors.HELPER, null));
        else if (i > 3 && j > 3 && i < this.n - 4 && j < this.n - 4)
          row.push(new Square(this, i, j, Colors.HELPER, null));
        else row.push(new Square(this, i, j, Colors.EMPTY, null));
      }
      this.squares.push(row);
    }
    this.addFigures();
  }

  public getSquare(x: number, y: number) {
    return this.squares[x][y];
  }

  private addFigures() {
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.n; j++) {
        if (this.squares[i][j].color == Colors.START)
          new King(Colors.WHITE, this.squares[i][j]);
        if (this.squares[i][j].color == Colors.TARGET)
          new Target(Colors.BLACK, this.squares[i][j]);
        if (this.squares[i][j].color == Colors.HELPER)
          new Helper(Colors.WHITE, this.squares[i][j]);
      }
    }
  }

  public highlightSquares(selected: Square | null) {
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.n; j++) {
        this.squares[i][j].avaliable = !!selected?.figure?.canMove(
          this.squares[i][j]
        );
      }
    }
  }

  public checkWin() {
    const king = this.game.king;
    if (!king) return;
    const square = king.square;
    if (king?.square.color == Colors.FINISH) {
      this.game.status = Status.WIN;
      return;
    }
    let count = 0;
    const x = square.x,
      y = square.y;
    if (x == 0 || this.getSquare(x - 1, y).figure?.name == FigureNames.TARGET)
      count++;
    if (
      x == this.n - 1 ||
      this.getSquare(x + 1, y).figure?.name == FigureNames.TARGET
    )
      count++;
    if (y == 0 || this.getSquare(x, y - 1).figure?.name == FigureNames.TARGET)
      count++;
    if (
      y == this.n - 1 ||
      this.getSquare(x, y + 1).figure?.name == FigureNames.TARGET
    )
      count++;
    if (count == 4) {
      this.game.status = Status.LOSE;
      return;
    }
    for (let i = 0; i < this.n; i++) {
      for(let j = 0; j < this.n; j++) {
        if (this.getSquare(i, j).figure?.color == this.game.color) {
          if(this.getSquare(i, j).haveMove()){
            return;
          }
        }
      }
    }
    if(this.game.color == Colors.WHITE)
      this.game.status = Status.LOSE;
    else
      this.game.status = Status.WIN;
  }
}
