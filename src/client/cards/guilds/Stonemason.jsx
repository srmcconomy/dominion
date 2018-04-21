import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';

export default class Stonemason extends Card {
  static description = (
    <div>
      <div>Trash a card from your hand. Gain 2 cards each costing less than it.</div>
      <Line />
      <div>When you buy this, you may overpay for it. If you do, gain 2 Actions each costing the amount you overpaid.</div>
    </div>
  );
  static cost = <Coin>2+</Coin>
  static types = ['Action'];
}

Card.classes.set('Stonemason', Stonemason);
