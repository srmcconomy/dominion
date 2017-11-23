import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Merchant extends Card {
  static description = <div>
  <p><strong>+1 Card</strong></p>
  <p><strong>+1 Action</strong></p>
  <p>The first time you play a Silver this turn, +<Coin>1</Coin>.</p>
  </div>
  static cost = <Coin>3</Coin>
  static types = ['Action'];
}

Card.classes.set('Merchant', Merchant);
