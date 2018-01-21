import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';

export default class Warrior extends Card {
  static description = (
    <div>
      <div><strong>+2 Cards</strong></div>
      <div>Once per traveller you have in play (including this), each other player discards the top card of their deck and trashes it if it costs <Coin>3</Coin> or <Coin>4</Coin>.</div>
      <Line />
      <div>When you discard this from play, you may exchange it for a Hero.</div>
      <div><em>(This is not in the Supply.)</em></div>
    </div>
  );
  static cost = <Coin>4*</Coin>
  static types = ['Action', 'Attack', 'Traveller'];
}
