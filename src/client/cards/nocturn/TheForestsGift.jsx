import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class TheForestsGift extends Card {
  static title = 'The Forest\'s Gift'
  static description = (
    <div>
      <div><strong>+1 Buy</strong></div>
      <div>+<Coin>1</Coin></div>
      <div><em>(Keep this until Clean-up.)</em></div>
    </div>
  );
  static cost = <Coin>0</Coin>
  static types = ['Boon'];
}

Card.classes.set('TheForestsGift', TheForestsGift);
