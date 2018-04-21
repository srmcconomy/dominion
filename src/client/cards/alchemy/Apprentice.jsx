import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import PotionImg from 'components/Potion';

export default class Apprentice extends Card {
  static description = (
    <div>
      <div><strong>+1 Action</strong></div>
      <div>Trash a card from your hand.</div>
      <div>+1 Card per <Coin>1</Coin> it costs.</div>
      <div>+2 Cards if it has <PotionImg /> in its cost.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action'];
}

Card.classes.set('Apprentice', Apprentice);
