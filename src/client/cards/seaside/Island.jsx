import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import VP from 'components/VP';
import Line from 'components/Line';
import Huge from 'components/Huge';

export default class Island extends Card {
  static description = (
    <div>
      <div>Put this and a card from your hand onto your Island mat.</div>
      <Line />
      <Huge><div><strong>2</strong> <VP /></div></Huge>
    </div>
	);
  static cost = <Coin>4</Coin>
  static types = ['Action', 'Victory'];

}

Card.classes.set('Island', Island);
