import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';

export default class GhostTown extends Card {
  static title = 'Ghost Town';
  static description = (
    <div>
      <div>At the start of your next turn, <strong>+1 Card</strong> and <strong>+1 Action</strong>.</div>
      <Line />
      <div>This is gained to your hand (instead of your discard pile).</div>
    </div>
  );
  static cost = <Coin>3</Coin>
  static types = ['Night', 'Duration'];
}

Card.classes.set('GhostTown', GhostTown);
