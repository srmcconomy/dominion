import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class TheEarthsGift extends Card {
  static title = 'The Earth\'s Gift'
  static description = (
    <div>
      <div>You may discard a Treasure to gain a card costing up to <Coin>4</Coin>.</div>
    </div>
  );
  static cost = <Coin>0</Coin>
  static types = ['Boon'];
}

Card.classes.set('TheEarthsGift', TheEarthsGift);
