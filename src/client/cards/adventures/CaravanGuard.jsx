import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';

export default class CaravanGuard extends Card {
  static title = 'Caravan Guard';
  static description = (
    <div>
      <div><strong>+1 Card</strong></div>
      <div><strong>+1 Action</strong></div>
      <div>At the start of your next turn, +<Coin>1</Coin>.</div>
      <Line />
      <div>When another player plays an Attack card, you may first play this from your hand.</div>
      <div><em>(+1 Action has no effect if it's not your turn.)</em></div>
    </div>
  );
  static cost = <Coin>3</Coin>
  static types = ['Action', 'Duration', 'Reaction'];
}
