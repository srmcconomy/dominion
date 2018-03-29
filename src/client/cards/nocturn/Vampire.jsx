import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Vampire extends Card {
  static description = (
    <div>
      <div>Each other player receives the next Hex.</div>
      <div>Gain a card costing up to <Coin>5</Coin> other than a Vampire.</div>
      <div>Exchange this for a Bat.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Night', 'Attack', 'Doom'];
}

Card.classes.set('Vampire', Vampire);
