import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Haunting extends Card {
  static description = (
    <div>
      <div>If you have at least 4 cards in hand, put one of them onto your deck.</div>
    </div>
  );
  static cost = <Coin>0</Coin>
  static types = ['Hex'];
}

Card.classes.set('Haunting', Haunting);
