import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Baron extends Card {
  static cost = <Coin>4</Coin>;
  static description = (
    <div>
      <div><strong>+1 Buy</strong></div>
      <div>You may discard an Estate for +<Coin>4</Coin>. If you don't, gain an Estate.</div>
    </div>
  );
  static types = ['Action'];
}
