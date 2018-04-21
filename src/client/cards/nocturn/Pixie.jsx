import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Pixie extends Card {
  static description = (
    <div>
      <div><strong>+1 Card</strong></div>
      <div><strong>+1 Action</strong></div>
      <div>Discard the top Boon. You may trash this to receive that Boon twice.</div>
      <div><em>Heirloom: Goat</em></div>
    </div>
  );
  static cost = <Coin>2</Coin>
  static types = ['Action', 'Fate'];
}

Card.classes.set('Pixie', Pixie);
