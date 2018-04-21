import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import VP from 'components/VP';
import Line from 'components/Line';
import Huge from 'components/Huge';

export default class Nobles extends Card {
  static cost = <Coin>6</Coin>;
  static description = (
    <div>
      <div>Choose one: <strong>+3 Cards</strong>; or <strong>+2 Actions</strong></div>
      <Line />
      <Huge><div><strong>2</strong> <VP /></div></Huge>
    </div>
  );
  static types = ['Action', 'Victory'];
}
