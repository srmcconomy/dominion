import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Tactician extends Card {
  static description = (<div>
  If you have at least one card in hand, discard your hand, and at the start of your next turn, <strong>+5 Cards</strong>, <strong>+1 Action</strong>, and <strong>+1 Buy</strong>.
  </div>);
  static cost = <Coin>5</Coin>
  static types = ['Action', 'Duration'];
}

Card.classes.set('Tactician', Tactician);
