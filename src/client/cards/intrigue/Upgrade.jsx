import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Upgrade extends Card {
  static cost = <Coin>5</Coin>;
  static description = (
    <div>
      <div><strong>+1 Card</strong></div>
      <div><strong>+1 Action</strong></div>
      <div>Trash a card from your hand. Gain a card costing exactly <Coin>1</Coin> more than it.</div>
    </div>
  );
  static types = ['Action'];
}
