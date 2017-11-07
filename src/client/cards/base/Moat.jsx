import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Moat extends Card {
  static description = <div>
  <p><strong>+2 Cards</strong></p>
  <p>-----------------------</p>
  <p>When another player plays an Attack card, you may first reveal this from your hand, to be unaffected by it.</p>
  </div>
  static cost = <Coin>2</Coin>
  static types = ['Action', 'Reaction'];
}

Card.classes.set('Moat', Moat);
