import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Haven extends Card {
  static description = (<div>
  <div><strong>+1 Card</strong></div>
  <div><strong>+1 Action</strong></div>
  <div>Set aside a card from your hand face down (under this). At the start of your next turn, put it into your hand.</div>
  </div>);
  static cost = <Coin>2</Coin>
  static types = ['Action', 'Duration'];
}

Card.classes.set('Haven', Haven);
