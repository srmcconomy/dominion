import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';

export default class Transmogrify extends Card {
  static description = (
    <div>
      <div><strong>+1 Action</strong></div>
      <div>Put this on your Tavern mat.</div>
      <Line />
      <div>At the start of your turn, you may call this, to trash a card from your hand, and gain a card to your hand costing up to <Coin>1</Coin> more than it.</div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Action', 'Reserve'];
}
