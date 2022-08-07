export class Piece{
    constructor(position,name,color) {
        this.position=position;
        this.name=name;
        this.color=color;
        this.numberMove=0;
    }
    moveto(position){
      this.position.hideNext();
      this.position.setVide(true)
      this.position=position;
      this.position.setVide(false)
      this.upDate();
      this.numberMove++;
    }
    setUpdate(upDate){
      this.upDate=upDate;
    }
    setPlayer(player){
      this.player=player;
    }
}