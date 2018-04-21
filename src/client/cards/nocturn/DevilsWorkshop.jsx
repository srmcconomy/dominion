import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class DevilsWorkshop extends Card {
  static title = 'Devil\'s Workshop'
  static description = (
    <div>
      <div>If the number of cards you've gained this turn is:</div>
      <div>2+, gain an Imp from its pile;</div>
      <div>1, gain a card costing up to <Coin>4</Coin>;</div>
      <div>0, gain a Gold.</div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Night'];
}

Card.classes.set('DevilsWorkshop', DevilsWorkshop);
