import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Copper extends Card {
  static fullArt = true;
  static cost = <Coin>0</Coin>;
  static value = <Coin>1</Coin>;
  static types = ['Treasure'];
}
