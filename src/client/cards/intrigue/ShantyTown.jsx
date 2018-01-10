import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class ShantyTown extends Card {
  static title = 'Shanty Town';
  static cost = <Coin>3</Coin>;
  static description = (
    <div>
      <div><strong>+2 Actions</strong></div>
      <div>Reveal your hand. If you have no Action cards in hand, <strong>+2 Cards</strong>.</div>
    </div>
  );
  static types = ['Action'];
}
