import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Cellar extends Card {
  static description = (
    <div>
      <div><strong>+1 Action</strong></div>
      <div>Discard any number of cards, then draw that many.</div>
    </div>
  );
  static cost = <Coin>2</Coin>
  static types = ['Action'];
}

Card.classes.set('Cellar', Cellar);
