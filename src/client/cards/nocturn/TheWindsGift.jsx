import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class TheWindsGift extends Card {
  static title = 'The Wind\'s Gift'
  static description = (
    <div>
      <div><strong>+2 Cards</strong></div>
      <div>Discard 2 cards.</div>
    </div>
  );
  static cost = <Coin>0</Coin>
  static types = ['Boon'];
}

Card.classes.set('TheWindsGift', TheWindsGift);
