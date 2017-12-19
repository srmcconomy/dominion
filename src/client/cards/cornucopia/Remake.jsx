import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Remake extends Card {
  static description = (
    <div>
      <div>Do this twice: Trash a card from your hand, then gain a card costing exactly <Coin>1</Coin> more than the trashed card.</div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Action'];
}

Card.classes.set('Remake', Remake);
