import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';

export default class Lighthouse extends Card {
  static description = (
    <div>
      <div><strong>+1 Action</strong></div>
      <div>Now and at the start of your next turn, +<Coin>1</Coin>.</div>
      <Line />
      <div>While this is in play, when another player plays an Attack card, it doesn't affect you.</div>
    </div>
  );
  static cost = <Coin>2</Coin>
  static types = ['Action', 'Duration'];
}

Card.classes.set('Lighthouse', Lighthouse);
