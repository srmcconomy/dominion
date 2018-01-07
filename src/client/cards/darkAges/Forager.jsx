import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Forager extends Card {
  static description = (
    <div>
      <div><strong>+1 Action</strong></div>
      <div><strong>+1 Buy</strong></div>
      <div>Trash a card from your hand, then +<Coin>1</Coin> per differently named Treasure in the trash.</div>
    </div>
  );
  static cost = <Coin>3</Coin>
  static types = ['Action'];
}

Card.classes.set('Forager', Forager);
