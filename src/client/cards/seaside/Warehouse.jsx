import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Warehouse extends Card {
  static description = (
    <div>
      <div><strong>+3 Cards</strong></div>
      <div><strong>+1 Action</strong></div>
      <div>Discard 3 cards.</div>
    </div>
  );
  static cost = <Coin>3</Coin>
  static types = ['Action'];
}

Card.classes.set('Warehouse', Warehouse);
