import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Moat extends Card {
  static description = (<div>
  <div><strong>+2 Cards</strong></div>
  <div>-----------------------</div>
  <div>When another player plays an Attack card, you may first reveal this from your hand, to be unaffected by it.</div>
  </div>);
  static cost = <Coin>2</Coin>
  static types = ['Action', 'Reaction'];
}

Card.classes.set('Moat', Moat);
