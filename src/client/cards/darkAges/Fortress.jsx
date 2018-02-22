import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';

export default class Fortress extends Card {
  static description = (
    <div>
      <div><strong>+1 Card</strong></div>
      <div><strong>+2 Actions</strong></div>
      <Line />
      <div>When you trash this, put it into your hand.</div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Action'];
}

Card.classes.set('Fortress', Fortress);
