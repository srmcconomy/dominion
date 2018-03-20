import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class TheFlamesGift extends Card {
  static title = 'The Flame\'s Gift'
  static description = (
    <div>
      <div>You may trash a card from your hand.</div>
    </div>
  );
  static cost = <Coin>0</Coin>
  static types = ['Boon'];
}

Card.classes.set('TheFlamesGift', TheFlamesGift);
