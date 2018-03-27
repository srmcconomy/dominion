import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Fear extends Card {
  static description = (
    <div>
      <div>If you have at least 5 cards in hand, discard an Action or Treasure (or reveal you can't).</div>
    </div>
  );
  static cost = <Coin>0</Coin>
  static types = ['Hex'];
}

Card.classes.set('Fear', Fear);
