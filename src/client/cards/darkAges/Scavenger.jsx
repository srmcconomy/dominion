import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Scavenger extends Card {
  static description = (
    <div>
      <div>+<Coin>2</Coin></div>
      <div>You may put your deck into your discard pile. Look through your discard pile and put one card from it onto your deck.</div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Action'];
}

Card.classes.set('Scavenger', Scavenger);
