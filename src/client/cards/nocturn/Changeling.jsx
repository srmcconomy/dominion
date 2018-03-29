import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';

export default class Changeling extends Card {
  static description = (
    <div>
      <div>Trash this. Gain a copy of a card you have in play.</div>
      <Line />
      <div>In games using this, when you gain a card costing <Coin>3</Coin> or more, you may exchange it for a Changeling.</div>
    </div>
  );
  static cost = <Coin>3</Coin>
  static types = ['Night'];
}

Card.classes.set('Changeling', Changeling);
