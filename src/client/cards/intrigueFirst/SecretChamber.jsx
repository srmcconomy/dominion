import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';

export default class SecretChamber extends Card {
  static title = 'Secret Chamber';
  static cost = <Coin>2</Coin>;
  static description = (
    <div>
      <div>Discard any number of cards. +<Coin>1</Coin> per card discarded.</div>
      <Line />
      <div>When another player plays an Attack card, you may reveal this from your hand. If you do, +2 Cards, then put 2 cards from your hand on top of your deck.</div>
    </div>
  );
  static types = ['Action', 'Reaction'];
}
