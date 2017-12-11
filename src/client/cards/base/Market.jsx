import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Market extends Card {
  static description = (<div>
  <div><strong>+1 Card</strong></div>
  <div><strong>+1 Action</strong></div>
  <div><strong>+1 Buy</strong></div>
  <div>+<Coin>1</Coin></div>
  </div>);
  static cost = <Coin>5</Coin>
  static types = ['Action'];
}

Card.classes.set('Market', Market);
