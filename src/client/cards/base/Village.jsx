import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Village extends Card {
  static description = (<div>
  <div><strong>+1 Card</strong></div>
  <div><strong>+2 Actions</strong></div>
  </div>);
  static cost = <Coin>3</Coin>
  static types = ['Action'];
}

Card.classes.set('Village', Village);
