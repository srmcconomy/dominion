import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Duchy extends Card {
  static fullArt = true;
  static cost = <Coin>5</Coin>;
  static types = ['Victory'];
}
