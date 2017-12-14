import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Treasury extends Card {
  static description = (
    <div>
      <div><strong>+1 Card</strong></div>
      <div><strong>+1 Action</strong></div>
      <div>+<Coin>1</Coin></div>
      <div>When you discard this from play, if you didn't buy a Victory card this turn, you may put this onto your deck.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action'];
}

Card.classes.set('Treasury', Treasury);
