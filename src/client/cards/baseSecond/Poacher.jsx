import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Poacher extends Card {
  static description = (
    <div>
      <div><strong>+1 Card</strong></div>
      <div><strong>+1 Action</strong></div>
      <div>+ <Coin>1</Coin></div>
      <div>Discard a card per empty supply pile.</div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Action'];
}

Card.classes.set('Poacher', Poacher);
