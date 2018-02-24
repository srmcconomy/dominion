import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Butcher extends Card {
  static description = (
    <div>
      <div>Take 2 Coin tokens. You may trash a card from your hand and then pay any number of Coin tokens. If you did trash a card, gain a card with a cost of up to the cost of the trashed card plus the number of Coin tokens you paid.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action'];
}

Card.classes.set('Butcher', Butcher);
