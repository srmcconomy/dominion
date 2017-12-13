import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Mine extends Card {
  static description = (
    <div>
      You may trash a Treasure from your hand. Gain a Treasure to your hand costing up to <Coin>3</Coin> more than it.
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action'];
}

Card.classes.set('Mine', Mine);
