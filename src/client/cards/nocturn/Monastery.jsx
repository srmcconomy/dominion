import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Monastery extends Card {
  static description = (
    <div>
      <div>For each card you've gained this turn, you may trash a card from your hand or a Copper you have in play.</div>
    </div>
  );
  static cost = <Coin>2</Coin>
  static types = ['Night'];
}

Card.classes.set('Monastery', Monastery);
