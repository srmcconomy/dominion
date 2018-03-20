import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class TheRiversGift extends Card {
  static title = 'The Rivers\'s Gift'
  static description = (
    <div>
      <div><strong>+1 Card</strong> at the end of this turn.</div>
      <div><em>(Keep this until Clean-up.)</em></div>
    </div>
  );
  static cost = <Coin>0</Coin>
  static types = ['Boon'];
}

Card.classes.set('TheRiversGift', TheRiversGift);
