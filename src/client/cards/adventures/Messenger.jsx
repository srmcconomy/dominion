import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';

export default class Messenger extends Card {
  static description = (
    <div>
      <div><strong>+1 Buy</strong></div>
      <div><strong>+1 <Coin>2</Coin></strong></div>
      <div>You may put your deck into your discard pile.</div>
      <Line />
      <div>When this is your first buy in a turn, gain a card costing up to <Coin>4</Coin>, and each other player gains a copy of it.</div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Action'];
}
