export class Player{
  constructor(name,score,color,piece){
      this.name=name;
      this.score=score;
      this.isMyTurn=false;
      this.color=color;
      this.piece=piece
  }

  endTurn=()=>{
    this.isMyTurn=false;
  }
  startTurn=()=>{
    this.isMyTurn=true;
  }
}