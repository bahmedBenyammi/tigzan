export class Position{
    #nexts=[];
    constructor(name,x,y){
        this.x=x;
        this.y=y;
        this.name=name;
        this.vide=true;
        this.#nexts=[]
        this.active=false;
    }
    nextPositions(nextPosition){
        this.#nexts.push(nextPosition);
    }
    actived(){
        if(this.vide==true)
           { this.active=true;
            this.UpDate();
        }
    }
    disactived(){
        this.active=false;
        this.UpDate();
    }
    showNext(){
        this.#nexts.forEach(element => {
            element.actived();
        });
    }
    hideNext(){
        this.#nexts.forEach(element => {
            element.disactived();
        });
    }
    setChangeFun(func){
        this.UpDate =func;
    }
    setVide(b){
      this.vide=b;
      this.UpDate();
    }
     setNexts(nexts){
        this.#nexts=nexts;
    }

}