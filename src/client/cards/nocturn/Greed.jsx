import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Greed extends Card {
  static description = (
    <div>
      <div>Gain a Copper onto your deck.</div>
    </div>
  );
  static cost = <Coin>0</Coin>
  static types = ['Hex'];
}

Card.classes.set('Greed', Greed);
