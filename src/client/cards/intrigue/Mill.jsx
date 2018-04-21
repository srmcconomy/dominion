import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import VP from 'components/VP';
import Line from 'components/Line';
import Big from 'components/Big';

export default class Mill extends Card {
  static cost = <Coin>4</Coin>;
  static description = (
    <div>
      <div><strong>+1 Card</strong></div>
      <div><strong>+1 Action</strong></div>
      <div>You may discard 2 cards, for +<Coin>2</Coin>.</div>
      <Line />
      <Big><div><strong>1</strong> <VP /></div></Big>
    </div>
  );
  static types = ['Action', 'Victory'];
}
