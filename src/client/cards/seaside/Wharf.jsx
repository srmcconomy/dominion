import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Wharf extends Card {
  static description = (
    <div>Now and at the start of your next turn: <strong>+2 Cards</strong> and <strong>+1 Buy</strong>.</div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action', 'Duration'];
}

Card.classes.set('Wharf', Wharf);
