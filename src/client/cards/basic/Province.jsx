import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Province extends Card {
  static fullArt = true;
  static cost = <Coin>8</Coin>;
  static types = ['Victory'];
}
