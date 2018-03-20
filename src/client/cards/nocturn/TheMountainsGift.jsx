import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class TheMountainsGift extends Card {
  static title = 'The Mountain\'s Gift'
  static description = (
    <div>
      <div>Gain a Silver.</div>
    </div>
  );
  static cost = <Coin>0</Coin>
  static types = ['Boon'];
}

Card.classes.set('TheMountainsGift', TheMountainsGift);
