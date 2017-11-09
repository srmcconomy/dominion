import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Festival extends Card {
  static description = <div>
  <p><strong>+2 Actions</strong></p>
  <p><strong>+1 Buy</strong></p>
  <p>+<Coin>2</Coin></p>
  </div>
  static cost = <Coin>5</Coin>
  static types = ['Action'];
}

Card.classes.set('Festival', Festival);
