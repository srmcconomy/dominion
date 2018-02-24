import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Dungeon extends Card {
  static description = (
    <div>
      <div><strong>+1 Action</strong></div>
      <div>Now and at the start of your next turn: <strong>+2 Cards</strong>, then discard 2 cards</div>
    </div>
  );
  static cost = <Coin>3</Coin>
  static types = ['Action', 'Duration'];
}
