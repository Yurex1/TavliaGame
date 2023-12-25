import {Colors} from './Colors';
import {Board} from './Board';
import {Figure, FigureNames} from './figures/Figure';

export class Square {
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    figure: Figure | null;
    board: Board;
    avaliable: boolean;
    id: number;
    constructor( board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
        this.board = board;
        this.avaliable = false;
        this.id = x * board.n + y;
    }

    isEmpty(): boolean{
        return this.figure == null;
    }

    isEmptyVertcal(target : Square): boolean{
        if(this.x !== target.x) return false;
        const min = Math.min(this.y, target.y), max = Math.max(this.y, target.y);
        for(let y = min + 1; y < max; y++){
            if(!this.board.getSquare(this.x, y).isEmpty()) return false;
        }
        if(target.isEmpty())
            return true;
        return false;
    }

    isEmptyHorizontal(target : Square): boolean{
        if(this.y !== target.y) return false;
        const min = Math.min(this.x, target.x), max = Math.max(this.x, target.x);
        for(let x = min + 1; x < max; x++){
            if(!this.board.getSquare(x, this.y).isEmpty()) return false;
        }
        if(target.isEmpty())
            return true;
        return false;
    }

    moveFigure(target: Square){
        if(this.figure?.canMove(target)){
            target.figure = this.figure;
            target.figure.square = target;
            this.figure = null;
            target.killEnemy();
            this.board.checkWin();
            this.board.game.history.push({from: this, to: target});
        }
    }

    private killEnemy(){
        if(this.x > 1 && this.figure?.color == this.board.getSquare(this.x - 2, this.y).figure?.color && this.board.getSquare(this.x - 1, this.y).figure?.color != this.figure?.color){
            if(this.board.getSquare(this.x - 1, this.y).figure?.name != FigureNames.KING)
                this.board.getSquare(this.x - 1, this.y).figure = null;
        }
        if(this.x < this.board.n - 2 && this.figure?.color == this.board.getSquare(this.x + 2, this.y).figure?.color && this.board.getSquare(this.x + 1, this.y).figure?.color != this.figure?.color){
            if(this.board.getSquare(this.x + 1, this.y).figure?.name != FigureNames.KING)
                this.board.getSquare(this.x + 1, this.y).figure = null;
        }
        if(this.y > 1 && this.figure?.color == this.board.getSquare(this.x, this.y - 2).figure?.color && this.board.getSquare(this.x, this.y - 1).figure?.color != this.figure?.color){
            if(this.board.getSquare(this.x, this.y - 1).figure?.name != FigureNames.KING)
                this.board.getSquare(this.x, this.y - 1).figure = null;
        }
        if(this.y < this.board.n - 2 && this.figure?.color == this.board.getSquare(this.x, this.y + 2).figure?.color && this.board.getSquare(this.x, this.y + 1).figure?.color != this.figure?.color){
            if(this.board.getSquare(this.x, this.y + 1).figure?.name != FigureNames.KING)
                this.board.getSquare(this.x, this.y + 1).figure = null;
        }
    }
}