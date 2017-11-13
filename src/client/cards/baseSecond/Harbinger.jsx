import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Harbinger extends Card {
  static description = <div>
  <p><strong>+1 Card</strong></p>
  <p><strong>+1 Action</strong></p>
  <p>Look through your discard pile. You may put a card from it onto your deck.</p>
  </div>
  static cost = <Coin>3</Coin>
  static types = ['Action'];
}

Card.classes.set('Harbinger', Harbinger);