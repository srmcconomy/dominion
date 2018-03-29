import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Bat extends Card {
  static description = (
    <div>
      <div>Trash up to 2 cards from your hand. If you trashed at least one, exchange this for a Vampire.</div>
      <div><em>(This is not in the Supply.)</em></div>
    </div>
  );
  static cost = <Coin>2*</Coin>
  static types = ['Night'];
}

Card.classes.set('Bat', Bat);
