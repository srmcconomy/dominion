import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';
import PotionImg from 'components/Potion';

export default class Alchemist extends Card {
  static description = (
    <div>
      <div><strong>+2 Cards</strong></div>
      <div><strong>+1 Action</strong></div>
      <Line />
      <div>When you discard this from play, if you have a Potion in play, you may put this onto your deck.</div>
    </div>
  );
  static cost = <div><Coin>3</Coin><PotionImg /></div>
  static types = ['Action'];
}

Card.classes.set('Alchemist', Alchemist);
