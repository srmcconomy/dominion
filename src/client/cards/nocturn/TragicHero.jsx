import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class TragicHero extends Card {
  static title = 'Tragic Hero'
  static description = (
    <div>
      <div><strong>+3 Cards</strong></div>
      <div><strong>+1 Buy</strong></div>
      <div>If you have 8 or more cards in hand (after drawing), trash this and gain a Treasure.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action'];
}

Card.classes.set('TragicHero', TragicHero);
