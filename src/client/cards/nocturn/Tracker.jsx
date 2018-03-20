import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';

export default class Tracker extends Card {
  static description = (
    <div>
      <div>+<Coin>1</Coin></div>
      <div>Receive a Boon.</div>
      <Line />
      <div>While this is in play, when you gain a card, you may put that card onto your deck.</div>
      <div><em>Heirloom: Pouch</em></div>
    </div>
  );
  static cost = <Coin>2</Coin>
  static types = ['Action', 'Fate'];
}

Card.classes.set('Tracker', Tracker);
