import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Princess extends Card {
  static description = (
    <div>
      <div><strong>+1 Buy</strong></div>
      <div>-------------</div>
      <div>While this is in play, cards cost <Coin>2</Coin> less, but not less than <Coin>0</Coin>.</div>
      <div><em>(This is not in the Supply.)</em></div>
    </div>
  );
  static cost = <Coin>0*</Coin>
  static types = ['Action', 'Prize'];
}

Card.classes.set('Princess', Princess);
