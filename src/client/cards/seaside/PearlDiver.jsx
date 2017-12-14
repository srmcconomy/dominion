import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class PearlDiver extends Card {
  static title = 'Pearl Diver'
  static description = (
    <div>
      <div><strong>+1 Card</strong></div>
      <div><strong>+1 Action</strong></div>
      <div>Look at the bottom card of your deck. You may put it on top.</div>
    </div>
    );
  static cost = <Coin>2</Coin>
  static types = ['Action'];
}

Card.classes.set('PearlDiver', PearlDiver);
