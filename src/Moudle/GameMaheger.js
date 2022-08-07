import { Piece } from './piece';
import { Player } from './Player';
import { Position } from './position'
export class GameManager {
    #isGameEnd;
    constructor() {
       
        this.positions = [];
        this.pieceBlue = [];
        this.pieceRed = [];
        this.pieceActive = null;
        this.players = [];
        this.playerTurn = null;
        this.#isGameEnd=false;
        this.setUpPosition();
        this.setUpMap();
        this.SetUpPiece();
        this.setUpPlayers();
    }
    SetUpPiece = () => {
        for (var i = 0; i < 3; i++) {
            this.positions[i].vide = false;
            let Piece1 = new Piece(this.positions[i], 'R' + i, 'RED')
            this.pieceRed.push(Piece1);
            this.positions[this.positions.length - 1 - i].vide = false;
            let piece2 = new Piece(this.positions[this.positions.length - 1 - i], 'B' + i, 'BLUE')
            this.pieceBlue.push(piece2);
        }
    }
    setUpPosition = () => {
        const p = [35, 225, 415];
        var i = 1;
        p.forEach(element => {
            p.forEach(element2 => {
                let position = new Position(i, element2, element);
                this.positions.push(position);
                i++;
            })
        });

    }
    setUpMap = () => {
        var p = 190;;
        this.positions.forEach(element => {
            if (element.name == 5)
                element.setNexts(this.positions);
            else {
                element.nextPositions(this.positions[4]);
                this.positions.forEach(element2 => {
                    if (((element.x + p === element2.x || element.x - p === element2.x) && element.y === element2.y)
                        || ((element.y + p === element2.y || element.y - p === element2.y) && element.x === element2.x))
                        if (element2.name != 5)
                            element.nextPositions(element2);
                })
            }
        })
    }
    setPieceActive(piece) {
        if (this.pieceActive != null) {
            this.pieceActive.position.hideNext();
        }
        this.pieceActive = piece
    }
    moveActivePieceto=async(position)=> {
        
        if (this.pieceActive != null) {
            this.pieceActive.moveto(position);
            this.pieceActive = null;
            
            this.changeTurn();
        }
    }
    setUpPlayers() {
        var player1 = new Player('Player1', 0, 'RED', this.pieceRed);
        this.pieceRed.forEach(element => {
            element.setPlayer(player1);
        })
        var player2 = new Player('Player2', 0, 'BLUE', this.pieceBlue)
        this.players.push(player1, player2);
        this.pieceBlue.forEach(element => {
            element.setPlayer(player2);
        })
        var i = Math.floor(Math.random() * 2);
        this.players[i].isMyTurn = true;
        this.playerTurn=this.players[i];
    }
    changeTurn() {
        let b =this.checkWin();
        if(!b)
        this.players.forEach(element => {
            element.isMyTurn = !element.isMyTurn;
            if (element.isMyTurn)
                this.playerTurn = element
        })
        this.update();
    }
    setUpdate(func) {
        this.update = func;
    }
    checkWin() {
        var piecePosition = [];
        var b=false;
        var winPlace = [[4, 5, 6], [1, 5, 9], [3, 5, 7], [1, 4, 7], [2, 5, 8], [3, 6, 9]];
        for (const [index, el] of this.playerTurn.piece.entries()) {
            if (el.numberMove === 0) break;
            piecePosition.push(el.position.name);
        }
        if (piecePosition.length === 3) {
           piecePosition.sort();
           for (const [index, el] of winPlace.entries()) {
             for(var i=0 ; i<3;i++)
              if(el[i]===piecePosition[i])
              b=true
              else{
               b=false   
              break;}
              if(b)
              break;
            }
        }
        if(b)
        this.#endGame();
         return b   
    }
    #endGame(){
        this.#isGameEnd=true;
    }
     getGameStatus(){
        return this.#isGameEnd;
    }
   
}