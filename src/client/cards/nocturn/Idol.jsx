import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Medium from 'components/Medium';

export default class Idol extends Card {
  static description = (
    <div>
      <Medium><div><Coin>2</Coin></div></Medium>
      <div>When you play this, if you then have an odd number of Idols in play, receive a Boon; if an even number, each other player gains a Curse.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Treasure', 'Attack', 'Fate'];
}

Card.classes.set('Idol', Idol);
