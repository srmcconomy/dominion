import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Gear extends Card {
  static description = (
    <div>
      <div><strong>+2 Cards</strong></div>
      <div>Set aside up to 2 cards from your hand face down (under this). At the start of your next turn, put them into your hand.</div>
    </div>
  );
  static cost = <Coin>3</Coin>
  static types = ['Action', 'Duration'];
}
