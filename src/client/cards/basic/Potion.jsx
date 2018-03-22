import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import PotionImg from 'components/Potion';

export default class Potion extends Card {
  static fullArt = true;
  static cost = <Coin>4</Coin>;
  static value = <PotionImg />;
  static types = ['Treasure'];
}
