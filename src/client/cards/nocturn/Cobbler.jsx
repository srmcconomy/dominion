import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Cobbler extends Card {
  static description = (
    <div>
      <div>At the start of your next turn, gain a card to your hand costing up to <Coin>4</Coin>.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Night', 'Duration'];
}

Card.classes.set('Cobbler', Cobbler);
