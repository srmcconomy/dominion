import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Minion extends Card {
  static cost = <Coin>5</Coin>;
  static description = (
    <div>
      <div><strong>+1 Action</strong></div>
      <div>Choose one: +<Coin>2</Coin>; or discard your hand, <strong>+4 Cards</strong>, and each other player with at least 5 cards in hand discards their hand and draws 4 cards.</div>
    </div>
  );
  static types = ['Action', 'Attack'];
}
