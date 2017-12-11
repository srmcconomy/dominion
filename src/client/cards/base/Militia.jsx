import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Militia extends Card {
  static description = (<div>
  <div>+<Coin>2</Coin></div>
  <div>Each other player discards down to 3 cards in hand.</div>
  </div>);
  static cost = <Coin>4</Coin>
  static types = ['Action', 'Attack'];
}

Card.classes.set('Militia', Militia);
