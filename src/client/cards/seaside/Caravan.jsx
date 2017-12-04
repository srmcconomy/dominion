import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Caravan extends Card {
  static description = (<div>
  <div><strong>+1 Card</strong></div>
  <div><strong>+1 Action</strong></div>
  <div>At the start of your next turn, <strong>+1 Card</strong>.</div>
  </div>);
  static cost = <Coin>4</Coin>
  static types = ['Action', 'Duration'];
}

Card.classes.set('Caravan', Caravan);
