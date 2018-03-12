import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Wish extends Card {
  static description = (
    <div>
      <div><strong>+1 Action</strong></div>
      <div>Return this to its pile. If you did, gain a card to your hand costing up to <Coin>6</Coin>.</div>
      <div><em>(This is not in the Supply.)</em></div>
    </div>
  );
  static cost = <Coin>0*</Coin>
  static types = ['Action'];
}

Card.classes.set('Wish', Wish);
