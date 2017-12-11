import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Ambassador extends Card {
  static description = (<div>Reveal a card from your hand. Return up to 2 copies of it from your hand to the Supply. Then each other player gains a copy of it.</div>);
  static cost = <Coin>3</Coin>
  static types = ['Action', 'Attack'];
}

Card.classes.set('Ambassador', Ambassador);
