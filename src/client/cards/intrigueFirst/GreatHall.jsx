import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import VP from 'components/VP';
import Line from 'components/Line';
import Big from 'components/Big';

export default class GreatHall extends Card {
  static title = 'Great Hall';
  static cost = <Coin>3</Coin>;
  static description = (
    <div>
      <div><strong>+1 Card</strong></div>
      <div><strong>+1 Action</strong></div>
      <Line />
      <Big><div><strong>1</strong> <VP /></div></Big>
    </div>
  );
  static types = ['Action', 'Victory'];
}
