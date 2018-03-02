import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';

export default class DenOfSin extends Card {
  static title = 'Den Of Sin';
  static description = (
    <div>
      <div>At the start of your next turn, <strong>+2 Cards</strong>.</div>
      <Line />
      <div>This is gained to your hand (instead of your discard pile).</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Night', 'Duration'];
}

Card.classes.set('DenOfSin', DenOfSin);
