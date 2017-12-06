import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Platinum extends Card {
  static fullArt = true;
  static cost = <Coin>9</Coin>;
  static value = <Coin>5</Coin>;
  static types = ['Treasure'];

}
