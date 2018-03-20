import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class TheSwampsGift extends Card {
  static title = 'The Swamp\'s Gift'
  static description = (
    <div>
      <div>Gain a Will-o\'-Wisp from its pile.</div>
    </div>
  );
  static cost = <Coin>0</Coin>
  static types = ['Boon'];
}

Card.classes.set('TheSwampsGift', TheSwampsGift);
