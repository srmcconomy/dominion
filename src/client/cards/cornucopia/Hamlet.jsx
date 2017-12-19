import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Hamlet extends Card {
  static description = (
    <div>
      <div><strong>+1 Card</strong></div>
      <div><strong>+1 Action</strong></div>
      <div>You may discard a card; if you do, +1 Action.</div>
      <div>You may discard a card; if you do, +1 Buy.</div>
    </div>
  );
  static cost = <Coin>2</Coin>
  static types = ['Action'];
}

Card.classes.set('Hamlet', Hamlet);
