import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';

export default class Page extends Card {
  static description = (
    <div>
      <div><strong>+1 Card</strong></div>
      <div><strong>+1 Action</strong></div>
      <Line />
      <div>When you discard this from play, you may exchange it for a Treasure Hunter.</div>
    </div>
  );
  static cost = <Coin>2</Coin>
  static types = ['Action', 'Traveller'];
}
