import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';

export default class HorseTraders extends Card {
  static title = 'Horse Traders';
  static description = (
    <div>
      <div><strong>+1 Buy</strong></div>
      <div>+<Coin>3</Coin></div>
      <div><strong>Discard 2 Cards</strong></div>
      <Line />
      <div>When another player plays an Attack card, you may set this aside from your hand. If you do, then at the start of your next turn, +1 Card and return this to your hand.</div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Action', 'Reaction'];
}

Card.classes.set('HorseTraders', HorseTraders);
