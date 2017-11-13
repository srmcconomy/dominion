import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Poacher extends Card {
  static description = <div>
  <p><strong>+1 Card</strong></p>
  <p><strong>+1 Action</strong></p>
  <p>+ <Coin>1</Coin></p>
  <p>Discard a card per empty supply pile.</p>
  </div>
  static cost = <Coin>4</Coin>
  static types = ['Action'];
}

Card.classes.set('Poacher', Poacher);
