import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class ZombieSpy extends Card {
  static title = 'Zombie Spy'
  static description = (
    <div>
      <div><strong>+1 Card</strong></div>
      <div><strong>+1 Action</strong></div>
      <p />
      <div>Look at the top card of your deck. Discard it or put it back.</div>
    </div>
  );
  static cost = <Coin>3</Coin>
  static types = ['Action', 'Zombie'];
}

Card.classes.set('ZombieSpy', ZombieSpy);
