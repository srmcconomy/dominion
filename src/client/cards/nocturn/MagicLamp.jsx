import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Medium from 'components/Medium';

export default class MagicLamp extends Card {
  static title = 'Magic Lamp'
  static description = (
    <div>
      <p />
      <Medium><div><Coin>1</Coin></div></Medium>
      <div>When you play this, if there are at least 6 cards that you have exactly 1 copy of in play, trash this. If you do, gain 3 Wishes from their pile.</div>
    </div>
  );
  static cost = <Coin>0</Coin>
  static types = ['Treasure', 'Heirloom'];
}

Card.classes.set('MagicLamp', MagicLamp);
