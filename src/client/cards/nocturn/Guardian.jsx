import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';

export default class Guardian extends Card {
  static description = (
    <div>
      <div>Until your next turn, when another player plays an Attack card, it doesn\'t affect you. At the start of your next turn,  +<Coin>1</Coin>.</div>
      <Line />
      <div>This is gained to your hand (instead of your discard pile).</div>
    </div>
  );
  static cost = <Coin>2</Coin>
  static types = ['Night', 'Duration'];
}

Card.classes.set('Guardian', Guardian);
