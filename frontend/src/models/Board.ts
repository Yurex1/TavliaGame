import { Square } from "./Square";
import { Colors } from "./Colors";
import { King } from "./figures/King";
import { Target } from "./figures/Target";
import { Helper } from "./figures/Helper";

export class Board {
    readonly n: number;
    squares: Square[][] = [];

    constructor(n: number) {
        this.n = n;
        for (let i = 0; i < this.n; i++) {
            const row: Square[] = [];
            for (let j = 0; j < this.n; j++) {
                if ((i == 0 || i == this.n - 1) && (j == 0 || j == this.n - 1))
                    row.push(new Square(this, j, i, Colors.FINISH, null));
                else if (((i == 0 || i == this.n - 1 || j == 0 || j == this.n - 1) && ((i > 2 && i < this.n - 3) || (j > 2 && j < this.n - 3))))
                    row.push(new Square(this, j, i, Colors.TARGET, null));
                else if ((i == (this.n - 1) / 2 && (j == 1 || j == this.n - 2)) || (j == (this.n - 1) / 2 && (i == 1 || i == this.n - 2)))
                    row.push(new Square(this, j, i, Colors.TARGET, null));
                else if (i == (this.n - 1) / 2 && j == (this.n - 1) / 2)
                    row.push(new Square(this, j, i, Colors.START, null));
                else if ((i == (this.n - 1) / 2 && j > (this.n - 1) / 2 - 3 && j < (this.n - 1) / 2 + 3) || (j == (this.n - 1) / 2 && i > (this.n - 1) / 2 - 3 && i < (this.n - 1) / 2 + 3))
                    row.push(new Square(this, j, i, Colors.HELPER, null));
                else if (i > 3 && j > 3 && i < this.n - 4 && j < this.n - 4)
                    row.push(new Square(this, j, i, Colors.HELPER, null));
                else
                    row.push(new Square(this, j, i, Colors.EMPTY, null));
            }
            this.squares.push(row);
        }
    }

    public getSquare(x: number, y: number) {
        return this.squares[y][x];
    }

    public addFigures() {
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.n; j++) {
                if (this.squares[i][j].color == Colors.START)
                    new King(Colors.HELPER, this.squares[i][j]);
                if (this.squares[i][j].color == Colors.TARGET)
                    new Target(Colors.TARGET, this.squares[i][j]);
                if (this.squares[i][j].color == Colors.HELPER)
                    new Helper(Colors.HELPER, this.squares[i][j]);
            }
        }
    }

    public highlightSquares(selected: Square | null) {
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.n; j++) {
                this.squares[i][j].avaliable = !!selected?.figure?.canMove(this.squares[i][j]);
            }
        }
    }

    public getCopyBoard(): Board {
        const newBoard = new Board(this.n);
        newBoard.squares = this.squares;
        return newBoard;
    }
}