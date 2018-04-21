import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class BadOmens extends Card {
  static title = 'Bad Omens'
  static description = (
    <div>
      <div>Put your deck into your discard pile. Look through it and put 2 Coppers from it onto your deck (or reveal you can't).</div>
    </div>
  );
  static cost = <Coin>0</Coin>
  static types = ['Hex'];
}

Card.classes.set('BadOmens', BadOmens);
