import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Locusts extends Card {
  static description = (
    <div>
      <div>Trash the top card of your deck. If it's a Copper or Estate, gain a Curse. Otherwise, gain a cheaper card that shares a type with it.</div>
    </div>
  );
  static cost = <Coin>0</Coin>
  static types = ['Hex'];
}

Card.classes.set('Locusts', Locusts);
