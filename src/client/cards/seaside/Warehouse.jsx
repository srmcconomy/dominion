import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Warehouse extends Card {
  static description = <div>
  <p><strong>+3 Cards</strong></p>
  <p><strong>+1 Action</strong></p>
  <p>Discard 3 cards.</p>
  </div>
  static cost = <Coin>3</Coin>
  static types = ['Action'];
}

Card.classes.set('Warehouse', Warehouse);
