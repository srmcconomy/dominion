import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Altar extends Card {
  static description = (
    <div>
      <div>Trash a card from your hand. Gain a card costing up to <Coin>5</Coin>.</div>
    </div>
  );
  static cost = <Coin>6</Coin>
  static types = ['Action'];
}

Card.classes.set('Altar', Altar);
