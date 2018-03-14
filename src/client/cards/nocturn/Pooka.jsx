import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Pooka extends Card {
  static description = (
    <div>
      <div>You may trash a Treasure other than Cursed Gold from your hand, for <strong>+4 Cards</strong>.</div>
      <div><em>Heirloom: Cursed Gold</em></div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action'];
}

Card.classes.set('Pooka', Pooka);
