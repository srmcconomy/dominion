import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Medium from 'components/Medium';

export default class CursedGold extends Card {
  static title = 'Cursed Gold'
  static description = (
    <div>
      <Medium><div><Coin>3</Coin></div></Medium>
      <div>When you play, this gain a Gold.</div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Treasure', 'Heirloom'];
}

Card.classes.set('CursedGold', CursedGold);
