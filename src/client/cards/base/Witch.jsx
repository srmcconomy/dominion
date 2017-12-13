import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Witch extends Card {
  static description = (
    <div>
      <div><strong>+2 Cards</strong></div>
      <div>Each other player gains a Curse.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action', 'Attack'];
}

Card.classes.set('Witch', Witch);
