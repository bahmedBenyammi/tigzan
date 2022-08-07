import React from "react";
export class PositionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position: props.position,
            gameManager: props.gameManager
        }
        this.state.position.setChangeFun(this.changePosition);
    }

    PositionCliked = () => {
        if (this.state.position.active == true)
            this.state.gameManager.moveActivePieceto(this.state.position)
    }
    changePosition = () => {
        this.setState({ position: this.state.position });
    }
    render() {
        
        return (
            <circle  className={this.state.position.active ? 'active' : 'disactive'} cx={this.state.position.x} cy={this.state.position.y} r="6.66"
                onClick={() => this.PositionCliked()} />
        )

    }
}