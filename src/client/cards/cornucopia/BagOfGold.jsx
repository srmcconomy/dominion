import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class BagOfGold extends Card {
  static title = 'Bag Of Gold';
  static description = (
    <div>
      <div><strong>+1 Action</strong></div>
      <div>Gain a Gold, putting it on top of your deck.</div>
      <div><em>(This is not in the Supply.)</em></div>
    </div>
  );
  static cost = <Coin>0*</Coin>
  static types = ['Action', 'Prize'];
}

Card.classes.set('BagOfGold', BagOfGold);
