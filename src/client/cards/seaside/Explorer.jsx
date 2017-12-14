import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Explorer extends Card {
  static description = (
    <div>You may reveal a Province from your hand. If you do, gain a Gold to your hand. If you don't, gain a Silver to your hand.</div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action'];
}

Card.classes.set('Explorer', Explorer);
