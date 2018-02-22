import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import VP from 'components/VP';
import Line from 'components/Line';
import Big from 'components/Big';
import Medium from 'components/Medium';

export default class Harem extends Card {
  static cost = <Coin>6</Coin>;
  static value = <Coin>2</Coin>;
  static description = (
    <div>
      <p />
      <Medium><div><Coin>2</Coin></div></Medium>
      <Line />
      <Big><div><strong>2</strong> <VP /></div></Big>
    </div>
  );
  static types = ['Treasure', 'Victory'];
}
