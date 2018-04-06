import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Governor extends Card {
  static description = (
    <div>
      <div><strong>+1 Action</strong></div>
      <div>Choose one; you get the version in parentheses: Each player gets <strong>+1 (+3) Cards</strong>; or each player gains a Silver (Gold); or each player may trash a card from their hand and gain a card costing exactly <Coin>1</Coin> (<Coin>2</Coin>) more.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action'];
}

Card.classes.set('Governor', Governor);
