import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Ranger extends Card {
  static description = (
    <div>
      <div><strong>+1 Buy</strong></div>
      <div>Turn your Journey token over (it starts face up). Then if it's face up, <strong>+5 Cards</strong></div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Action'];
}
