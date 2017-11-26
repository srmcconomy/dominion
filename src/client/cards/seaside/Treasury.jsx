import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Treasury extends Card {
  static description = <div>
  <p>+<strong>1 Card</strong></p>
  <p>+<strong>1 Action</strong></p>
  <p>+<Coin>1</Coin></p>
  <p>When you discard this from play, if you didn't buy a Victory card this turn, you may put this onto your deck.</p>
  </div>
  static cost = <Coin>5</Coin>
  static types = ['Action'];
}

Card.classes.set('Treasury', Treasury);
