import React, { Component } from 'react';

import Card from 'components/Card';

export default class Player extends Component {
  render() {
    const { name, hand, discardPile, deck } = this.props.data;
    return (
      <div>
        <div>
          {name}
        </div>
        <div>
          {hand}
        </div>
        <div>
          <Card data={discardPile} />
        </div>
        <div>
          {deck}
        </div>
      </div>
    );
  }
}
