import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Armory extends Card {
  static description = (
    <div>
      <div>Gain a card onto your deck costing up to <Coin>4</Coin>.</div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Action'];
}

Card.classes.set('Armory', Armory);
