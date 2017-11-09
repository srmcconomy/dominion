import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Cellar extends Card {
  static description = <div>
  <p><strong>+1 Action</strong></p>
  <p>Discard any number of cards, then draw that many.</p>
  </div>
  static cost = <Coin>2</Coin>
  static types = ['Action'];
}

Card.classes.set('Cellar', Cellar);
