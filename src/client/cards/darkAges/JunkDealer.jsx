import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class JunkDealer extends Card {
  static title = 'Junk Dealer';
  static description = (
    <div>
      <div><strong>+1 Card</strong></div>
      <div><strong>+1 Action</strong></div>
      <div>+<Coin>1</Coin></div>
      <div>Trash a card from your hand.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action'];
}

Card.classes.set('JunkDealer', JunkDealer);
