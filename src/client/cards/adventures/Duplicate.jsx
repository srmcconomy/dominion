import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';

export default class Duplicate extends Card {
  static description = (
    <div>
      <div><strong>+1 Card</strong></div>
      <div><strong>+1 Action</strong></div>
      <div>Put this on your Tavern mat.</div>
      <Line />
      <div>When you gain a card costing up to <Coin>6</Coin>, you may call this, to gain a cop of that card.</div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Action', 'Reserve'];
}
