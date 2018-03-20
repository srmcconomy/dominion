import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class TheMoonsGift extends Card {
  static description = (
    <div>
      <div>Look through your discard pile. You may put a card from it onto your deck.</div>
    </div>
  );
  static cost = <Coin>0</Coin>
  static types = ['Boon'];
}

Card.classes.set('TheMoonsGift', TheMoonsGift);
