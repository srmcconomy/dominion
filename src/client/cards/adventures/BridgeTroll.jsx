import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';

export default class BridgeTroll extends Card {
  static title = 'Bridge Troll';
  static description = (
    <div>
      <div>Each other player takes their –<Coin>1</Coin> token.</div>
      <div>Now and at the start of your next turn: <strong>+1 Buy</strong></div>
      <Line />
      <div>While this is in play, cards cost <Coin>1</Coin> less on your turns, but not less than <Coin>0</Coin>.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action', 'Attack', 'Duration'];
}
