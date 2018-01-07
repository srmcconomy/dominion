import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class TrustySteed extends Card {
  static title = 'Trusty Steed';
  static description = (
    <div>
      <div>Choose two: +2 Cards; +2 Actions; +<Coin>2</Coin>; gain 4 Silvers and put your deck into your discard pile.</div>
      <div>(The choices must be different.)</div>
      <div><em>(This is not in the Supply.)</em></div>
    </div>
  );
  static cost = <Coin>0*</Coin>
  static types = ['Action', 'Prize'];
}

Card.classes.set('TrustySteed', TrustySteed);
