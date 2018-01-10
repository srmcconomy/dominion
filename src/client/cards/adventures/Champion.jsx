import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Champion extends Card {
  static description = (
    <div>
      <div><strong>+1 Action</strong></div>
      <div>For the rest of the game, when another player plays an Attack card, it doesn't affect you, and when you play an Action, <strong>+1 Action</strong>.</div>
      <div><em>(This stays in play. This is not in the Supply.)</em></div>
    </div>
  );
  static cost = <Coin>6*</Coin>
  static types = ['Action', 'Duration'];
}
