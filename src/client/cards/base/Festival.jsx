import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Festival extends Card {
  static description = (<div>
  <div><strong>+2 Actions</strong></div>
  <div><strong>+1 Buy</strong></div>
  <div>+<Coin>2</Coin></div>
  </div>);
  static cost = <Coin>5</Coin>
  static types = ['Action'];
}

Card.classes.set('Festival', Festival);
