import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';
import Medium from 'components/Medium';

export default class Masterpiece extends Card {
  static description = (
    <div>
      <Medium><div><Coin>1</Coin></div></Medium>
      <Line />
      <div>When you buy this, you may overpay for it. If you do, gain a Silver per <Coin>1</Coin> you overpaid.</div>
    </div>
  );
  static cost = <Coin>3+</Coin>
  static types = ['Treasure'];
}

Card.classes.set('Masterpiece', Masterpiece);
