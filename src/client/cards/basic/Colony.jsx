import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Colony extends Card {
  static fullArt = true;
  static cost = <Coin>11</Coin>;
  static types = ['Victory'];
}
