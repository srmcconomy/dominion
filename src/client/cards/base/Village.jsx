import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Village extends Card {
  static description = <div>
  <p><strong>+1 Card</strong></p>
  <p><strong>+2 Actions</strong></p>
  </div>
  static cost = <Coin>3</Coin>
  static types = ['Action'];
}

Card.classes.set('Village', Village);
