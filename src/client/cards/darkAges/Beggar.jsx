import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Beggar extends Card {
  static description = (
    <div>
      <div>Gain 3 Coppers to your hand.</div>
      <div>----------------------------</div>
      <div>When another player plays an Attack card, you may first discard this to gain 2 Silvers, putting one onto your deck.</div>
    </div>
  );
  static cost = <Coin>2</Coin>
  static types = ['Action', 'Reaction'];
}

Card.classes.set('Beggar', Beggar);
