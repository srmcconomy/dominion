import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Medium from 'components/Medium';

export default class LuckyCoin extends Card {
  static title = 'Lucky Coin'
  static description = (
    <div>
      <Medium><div><Coin>1</Coin></div></Medium>
      <div>When you play this, gain a Silver.</div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Treasure', 'Heirloom'];
}

Card.classes.set('LuckyCoin', LuckyCoin);
