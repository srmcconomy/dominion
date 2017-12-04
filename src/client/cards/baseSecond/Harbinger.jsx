import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Harbinger extends Card {
  static description = (<div>
  <div><strong>+1 Card</strong></div>
  <div><strong>+1 Action</strong></div>
  <div>Look through your discard pile. You may put a card from it onto your deck.</div>
  </div>);
  static cost = <Coin>3</Coin>
  static types = ['Action'];
}

Card.classes.set('Harbinger', Harbinger);