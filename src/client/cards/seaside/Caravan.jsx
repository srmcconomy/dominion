import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Caravan extends Card {
  static description = <div>
  <p><strong>+1 Card</strong></p>
  <p><strong>+1 Action</strong></p>
  <p>At the start of your next turn, <strong>+1 Card</strong>.</p>
  </div>
  static cost = <Coin>4</Coin>
  static types = ['Action', 'Duration'];
}

Card.classes.set('Caravan', Caravan);
