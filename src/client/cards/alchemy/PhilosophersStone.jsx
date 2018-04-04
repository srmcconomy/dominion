import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import PotionImg from 'components/Potion';

export default class PhilosophersStone extends Card {
  static title = 'Philosopher\'s Stone'
  static description = (
    <div>
      <div>When you play this, count your deck and discard pile. Worth <Coin>1</Coin> per 5 cards total between them (round down).</div>
    </div>
  );
  static cost = <div><Coin>3</Coin><PotionImg /></div>
  static value = <Coin>?</Coin>;
  static types = ['Treasure'];
}

Card.classes.set('PhilosophersStone', PhilosophersStone);
