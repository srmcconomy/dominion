import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Jester extends Card {
  static description = (
    <div>
      <div>+<Coin>2</Coin></div>
      <div>Each other player discards the top card of his deck. If it's a Victory card he gains a Curse. Otherwise either he gains a copy of the discarded card or you do, your choice.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action', 'Attack'];
}

Card.classes.set('Jester', Jester);
