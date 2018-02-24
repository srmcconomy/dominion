import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Masterpiece extends Card {
  static description = (
    <div>
      <div><Coin>1</Coin></div>
      <div>-----------------------</div>
      <div>When you buy this, you may overpay for it. If you do, gain a Silver per <Coin>1</Coin> you overpaid.</div>
    </div>
  );
  static cost = <Coin>3+</Coin>
  static types = ['Treasure'];
}

Card.classes.set('Masterpiece', Masterpiece);
