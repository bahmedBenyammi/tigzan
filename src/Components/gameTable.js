import './GameTable.css'
import {io} from 'socket.io-client'
import React, { useState } from 'react'
import { PositionComponent } from './PositionComponent'
import { GameManager } from '../Moudle/GameMaheger';
import { PieceComponent } from './PieceComponent';
import ReactModal from 'react-modal';
class GameTable extends React.Component {
    constructor(props) {
        
        super(props);
        this.state = {
            gameManager:new GameManager(),
        }
        

        this.state.gameManager.setUpdate(this.update)
    }
    update = () => {
        this.setState({ gameManager: this.state.gameManager })
    }
    tryAgainFun=()=>{
        console.log("windows don't reload")
        window.location.reload();
    }
    returnToHome=()=>{}
    render() {
        return (
            <div className="contient">
                <div className="item ">
                    <div className={"playerField topPlayer shadow-sm border " + (this.state.gameManager.players[0].isMyTurn ? 'Myturn' : '')}>
                        <div className="playerDetil"><p>{this.state.gameManager.players[0].name}</p></div>

                        <div className="playerDetil"><p>Score:200 </p></div>
                    </div>
                </div>
                <div className="gameTable item shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 450">

                        <rect className="cls-1" x="35" y="35" width="380" height="380" />
                        <line className="cls-1" x1="225" y1="35" x2="225" y2="415" />
                        <line className="cls-1" x1="35" y1="225" x2="415" y2="225" />
                        <line className="cls-1" x1="35" y1="35" x2="415" y2="415" />
                        <line className="cls-1" x1="35" y1="415" x2="415" y2="35" />
                        <TablePosition position={this.state.gameManager.positions} gameManager={this.state.gameManager} />
                        <SetPiece piece={this.state.gameManager.pieceBlue} gameManager={this.state.gameManager} />
                        <SetPiece piece={this.state.gameManager.pieceRed} gameManager={this.state.gameManager} />

                    </svg>
                </div>
                <div className="item ">
                    <div className={"playerField bottomPlayer shadow border " + (this.state.gameManager.players[1].isMyTurn ? 'Myturn' : '')}>
                        <div className="playerDetil"><p>{this.state.gameManager.players[1].name}</p></div>

                        <div className="playerDetil"><p>Score:200 </p></div>
                    </div>
                </div>
                
                {this.state.gameManager.getGameStatus() &&
                <EndGame tryAgainFun={this.tryAgainFun} returnToHome={this.returnToHome} playerWin={this.state.gameManager.playerTurn.name} />
                }
            </div>

        )

    }
}
function TablePosition(propse) {
    return (
        propse.position.map((element) => {
            return (<PositionComponent key={element.name} position={element} gameManager={propse.gameManager} />)
        })
    )
}
function SetPiece(propse) {
    return (
        propse.piece.map((element) => {
            return (<PieceComponent key={element.name} piece={element} gameManager={propse.gameManager} />)
        })
    )
}
const EndGame=({tryAgainFun,returnToHome,playerWin})=> {
    console.log(tryAgainFun,returnToHome,playerWin)
    return(
        <ReactModal
        isOpen={true}
        className="Model"
    >

        <div className="modal-content">
            <div className="modal-body my-auto">
            <p className='text-center h3'>Game Over</p>
                <p className='text-center'> {playerWin} win</p>
            </div>
            <div className="modal-footer">
                <div className='divButton'>
                    <button type="button" className="btn btn-primary" onClick={tryAgainFun}>play again</button>
                </div>
            </div>
        </div>

    </ReactModal>
    
    )
}
export default GameTable;