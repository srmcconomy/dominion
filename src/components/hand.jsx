import React, { Component } from 'reac';

export default class Hand extends Component {
  render() {
    return (
      <div className="hand">
        {this.props.data.map((card, i) => <Card id={i} data={card} />)}
      </div>
    );
  }
}
