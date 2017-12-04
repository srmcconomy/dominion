import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Merchant extends Card {
  static description = (<div>
  <div><strong>+1 Card</strong></div>
  <div><strong>+1 Action</strong></div>
  <div>The first time you play a Silver this turn, +<Coin>1</Coin>.</div>
  </div>);
  static cost = <Coin>3</Coin>
  static types = ['Action'];
}

Card.classes.set('Merchant', Merchant);
