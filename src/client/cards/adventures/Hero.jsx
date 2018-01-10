import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';

export default class Hero extends Card {
  static description = (
    <div>
      <div>+<Coin>2</Coin></div>
      <div>Gain a Treasure.</div>
      <Line />
      <div>When you discard this from play, you may exchange it for a Champion.</div>
      <div><em>(This is not in the Supply.)</em></div>
    </div>
  );
  static cost = <Coin>5*</Coin>
  static types = ['Action', 'Traveller'];
}
