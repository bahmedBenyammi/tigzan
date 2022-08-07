import React from "react";
import './GameTable.css'
export class PieceComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            piece:props.piece,
            gameManager:props.gameManager
        }
        this.state.piece.setUpdate(this.Update);
    }
    Update=()=>{
        this.setState({piece:this.state.piece});    }
    activePiece=()=>{
        
        if(this.state.piece.player.isMyTurn&&!this.state.gameManager.getGameStatus()){
        this.state.gameManager.setPieceActive(this.state.piece);
        this.state.piece.position.showNext();}
    }
    render(){
        
        return ( 
            <circle  className={this.state.piece.color} cx={this.state.piece.position.x} cy={this.state.piece.position.y} r="15"
            onClick={this.activePiece} />
         )
         
    }
}