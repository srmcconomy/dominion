import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Silver extends Card {
  static fullArt = true;
  static cost = <Coin>3</Coin>;
  static value = <Coin>2</Coin>;
  static types = ['Treasure'];
}
