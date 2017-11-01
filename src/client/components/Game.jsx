import React, { Component } from 'react';

export default class Game extends Component {
  render() {
    return (
      <div className="game">
        <div className="supplies">
          {this.props.data.supplies.map(supply => <Supply data={supply} />);}
        </div>
        <div className="hand">
          <Hand data={this.props.player.hand} />
        </div>
      </div>
    );
  }
}
