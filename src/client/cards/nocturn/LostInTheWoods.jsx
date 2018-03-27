import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class LostInTheWoods extends Card {
  static title = 'Lost in the Woods'
  static description = (
    <div>
      <div>At the start of your turn, you may discard a card to receive a Boon.</div>
    </div>
  );
  static cost = <Coin>0</Coin>
  static types = ['State'];
}

Card.classes.set('LostInTheWoods', LostInTheWoods);
