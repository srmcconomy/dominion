import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Diplomat extends Card {
  static cost = <Coin>4</Coin>;
  static description = (
    <div>
      <div><strong>+2 Cards</strong></div>
      <div>If you have 5 or fewer cards in hand (after drawing), <strong>+2 Actions</strong>.</div>
      <div>---</div>
      <div>When another player plays an Attack card, you may first reveal this from a hand of 5 or more cards, to draw 2 cards the discard 3.</div>
    </div>
  );
  static types = ['Action', 'Reaction'];
}
