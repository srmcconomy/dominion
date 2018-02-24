import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';

export default class TreasureHunter extends Card {
  static title = 'Treasure Hunter';
  static description = (
    <div>
      <div><strong>+1 Action</strong></div>
      <div>+<Coin>1</Coin></div>
      <div>Gain a Silver per card the player to your right gained on their last turn.</div>
      <Line />
      <div>When you discard this from play, you may exchange it for a Warrior.</div>
      <div><em>(This is not in the Supply.)</em></div>
    </div>
  );
  static cost = <Coin>3*</Coin>
  static types = ['Action', 'Traveller'];
}
