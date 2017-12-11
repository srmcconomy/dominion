import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Embargo extends Card {
  static description = (<div>
  <div>+<Coin>2</Coin></div>
  <div>Trash this. Add an Embargo token to a Supply pile. (For the rest of the game, when a player buys a card from that pile, they gain a Curse.)</div>
  </div>);
  static cost = <Coin>2</Coin>
  static types = ['Action'];
}

Card.classes.set('Embargo', Embargo);
