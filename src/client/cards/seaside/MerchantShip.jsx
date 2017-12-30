import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class MerchantShip extends Card {
  static title = 'Merchant Ship'
  static description = (
    <div>Now and at the start of your next turn: +<Coin>2</Coin>.</div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action', 'Duration'];
}

Card.classes.set('MerchantShip', MerchantShip);
