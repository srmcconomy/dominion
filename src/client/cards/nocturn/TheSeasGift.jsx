import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class TheSeasGift extends Card {
  static title = 'The Sea\'s Gift'
  static description = (
    <div>
      <div><strong>+1 Card</strong></div>
    </div>
  );
  static cost = <Coin>0</Coin>
  static types = ['Boon'];
}

Card.classes.set('TheSeasGift', TheSeasGift);
