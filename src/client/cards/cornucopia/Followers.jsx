import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Followers extends Card {
  static description = (
    <div>
      <div><strong>+2 Cards</strong></div>
      <div>Gain an Estate. Each other player gains a Curse and discards down to 3 cards in hand.</div>
      <div><em>(This is not in the Supply.)</em></div>
    </div>
  );
  static cost = <Coin>0*</Coin>
  static types = ['Action', 'Attack', 'Prize'];
}

Card.classes.set('Followers', Followers);
