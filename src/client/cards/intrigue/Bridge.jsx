import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Bridge extends Card {
  static cost = <Coin>4</Coin>;
  static description = (
    <div>
      <div><strong>+1 Buy</strong></div>
      <div>+<Coin>1</Coin></div>
      <div>This turn, cards (everywhere) cost <Coin>1</Coin> less, but not less than <Coin>0</Coin>.</div>
    </div>
  );
  static types = ['Action'];
}
