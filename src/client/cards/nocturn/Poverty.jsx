import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Poverty extends Card {
  static description = (
    <div>
      <div>Discard down to 3 cards in hand.</div>
    </div>
  );
  static cost = <Coin>0</Coin>
  static types = ['Hex'];
}

Card.classes.set('Poverty', Poverty);
