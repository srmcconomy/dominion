import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Laboratory extends Card {
  static description = (<div>
  <div><strong>+2 Cards</strong></div>
  <div><strong>+1 Action</strong></div>
  </div>);
  static cost = <Coin>5</Coin>
  static types = ['Action'];
}

Card.classes.set('Laboratory', Laboratory);
