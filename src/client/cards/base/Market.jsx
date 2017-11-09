import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Market extends Card {
  static description = <div>
  <p><strong>+1 Card</strong></p>
  <p><strong>+1 Action</strong></p>
  <p><strong>+1 Buy</strong></p>
  <p>+<Coin>1</Coin></p>
  </div>
  static cost = <Coin>5</Coin>
  static types = ['Action'];
}

Card.classes.set('Market', Market);
