import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Gold extends Card {
  static fullArt = true;
  static cost = <Coin>6</Coin>;
  static value = <Coin>3</Coin>;
  static types = ['Treasure'];

}
