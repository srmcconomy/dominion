import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Vagrant extends Card {
  static description = (
    <div>
      <div><strong>+1 Card</strong></div>
      <div><strong>+1 Action</strong></div>
      <div>Reveal the top card of your deck. If it's a Curse, Ruins, Shelter, or Victory card, put it into your hand.</div>
    </div>
  );
  static cost = <Coin>2</Coin>
  static types = ['Action'];
}

Card.classes.set('Vagrant', Vagrant);
