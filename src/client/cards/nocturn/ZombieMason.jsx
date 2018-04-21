import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class ZombieMason extends Card {
  static title = 'Zombie Mason'
  static description = (
    <div>
      <div>Trash the top card of your deck. You may gain a card costing up to <Coin>1</Coin> more than it.</div>
    </div>
  );
  static cost = <Coin>3</Coin>
  static types = ['Action', 'Zombie'];
}

Card.classes.set('ZombieMason', ZombieMason);
