import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Medium from 'components/Medium';

export default class Pouch extends Card {
  static description = (
    <div>
      <Medium><div><Coin>1</Coin></div></Medium>
      <div><strong>+1 Buy</strong></div>
    </div>
  );
  static cost = <Coin>2</Coin>
  static types = ['Treasure', 'Heirloom'];
}

Card.classes.set('Pouch', Pouch);
