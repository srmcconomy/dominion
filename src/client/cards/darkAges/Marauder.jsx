import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Marauder extends Card {
  static description = (
    <div>
      <div>Gain a Spoils from the Spoils pile. Each other player gains a Ruins.</div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Action', 'Attack', 'Looter'];
}

Card.classes.set('Marauder', Marauder);
