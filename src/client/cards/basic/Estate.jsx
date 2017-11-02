import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Estate extends Card {
  static fullArt = true;
  static cost = <Coin>2</Coin>;
  static types = ['Victory'];
}
