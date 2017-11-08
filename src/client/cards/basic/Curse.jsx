import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Curse extends Card {
  static fullArt = true;
  static cost = <Coin>0</Coin>;
  static types = ['Curse'];
}
