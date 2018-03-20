import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class TheSkysGift extends Card {
  static title = 'The Sky\'s Gift'
  static description = (
    <div>
      <div>You may discard 3 cards to gain a Gold.</div>
    </div>
  );
  static cost = <Coin>0</Coin>
  static types = ['Boon'];
}

Card.classes.set('TheSkysGift', TheSkysGift);
