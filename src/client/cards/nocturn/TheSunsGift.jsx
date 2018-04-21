import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class TheSunsGift extends Card {
  static title = 'The Sun\'s Gift'
  static description = (
    <div>
      <div>Look at the top 4 cards of your deck. Discard any number of them and put the rest back in any order.</div>
    </div>
  );
  static cost = <Coin>0</Coin>
  static types = ['Boon'];
}

Card.classes.set('TheSunsGift', TheSunsGift);
