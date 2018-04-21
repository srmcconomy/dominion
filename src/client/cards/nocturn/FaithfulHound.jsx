import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';

export default class FaithfulHound extends Card {
  static title = 'Faithful Hound'
  static description = (
    <div>
      <div><strong>+2 Cards</strong></div>
      <Line />
      <div>When you discard this other than during Clean-up, you may set it aside, and put it into your hand at end of turn.</div>
    </div>
  );
  static cost = <Coin>2</Coin>
  static types = ['Action', 'Reaction'];
}

Card.classes.set('FaithfulHound', FaithfulHound);
