import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import PotionImg from 'components/Potion';

export default class Familiar extends Card {
  static description = (
    <div>
      <div><strong>+1 Card</strong></div>
      <div><strong>+1 Action</strong></div>
      <div>Each other player gains a Curse.</div>
    </div>
  );
  static cost = <div><Coin>3</Coin><PotionImg /></div>
  static types = ['Action', 'Attack'];
}

Card.classes.set('Familiar', Familiar);
