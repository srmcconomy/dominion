import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class ShantyTown extends Card {
  static title = 'Shanty Town';
  static cost = <Coin>3</Coin>;
  static description = (
    <div>
      <span>+2 Actions</span>
      <span>Reveal your hand. If you have no Action cards in hand, +2 Cards.</span>
    </div>
  );
  static types = ['Action'];
}
