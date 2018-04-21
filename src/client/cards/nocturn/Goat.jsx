import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Medium from 'components/Medium';

export default class Goat extends Card {
  static description = (
    <div>
      <Medium><div><Coin>1</Coin></div></Medium>
      <div>When you play this, you may trash a card from your hand.</div>
    </div>
  );
  static cost = <Coin>2</Coin>
  static types = ['Treasure', 'Heirloom'];
}

Card.classes.set('Goat', Goat);
