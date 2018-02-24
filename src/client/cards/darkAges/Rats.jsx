import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';

export default class Rats extends Card {
  static description = (
    <div>
      <div><strong>+1 Card</strong></div>
      <div><strong>+1 Action</strong></div>
      <div>Gain a Rats. Trash a card from your hand other than a Rats (or reveal a hand of all Rats).</div>
      <Line />
      <div>When you trash this, <strong>+1 Card</strong>.</div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Action'];
}

Card.classes.set('Rats', Rats);
