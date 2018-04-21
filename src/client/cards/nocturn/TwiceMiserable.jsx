import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import VP from 'components/VP';
import Huge from 'components/Huge';

export default class TwiceMiserable extends Card {
  static title = 'Twice Miserable'
  static description = (
    <div>
      <Huge><div><strong>-2</strong> <VP /></div></Huge>
    </div>
  );
  static cost = <Coin>0</Coin>
  static types = ['State'];
}

Card.classes.set('TwiceMiserable', TwiceMiserable);
