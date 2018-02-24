import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import VP from 'components/VP';
import Line from 'components/Line';
import Big from 'components/Big';

export default class OvergrownEstate extends Card {
  static description = (
    <div>
      <Big><div><strong>0</strong> <VP /></div></Big>
      <Line />
      <div>When you trash this, <strong>+1 Card</strong>.</div>
    </div>
  );
  static cost = <Coin>1</Coin>
  static types = ['Victory', 'Shelter'];
}

Card.classes.set('OvergrownEstate', OvergrownEstate);
