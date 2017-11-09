import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Remodel extends Card {
  static description = <div>
  Trash a card from your hand.
Gain a card costing up to <Coin>2</Coin> more than it.
  </div>
  static cost = <Coin>4</Coin>
  static types = ['Action'];
}

Card.classes.set('Remodel', Remodel);
