import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';

export default class Guide extends Card {
  static description = (
    <div>
      <div><strong>+1 Card</strong></div>
      <div><strong>+1 Action</strong></div>
      <div>Put this on your Tavern mat.</div>
      <Line />
      <div>At the start of your turn, you may call this, to discard your hand and draw 5 cards.</div>
    </div>
  );
  static cost = <Coin>3</Coin>
  static types = ['Action', 'Reserve'];
}
