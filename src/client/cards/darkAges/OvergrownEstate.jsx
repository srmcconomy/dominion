import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class OvergrownEstate extends Card {
  static description = (
    <div>
      <div>0 VP</div>
      <div>--------------</div>
      <div>When you trash this, <strong>+1 Card</strong>.</div>
    </div>
  );
  static cost = <Coin>1</Coin>
  static types = ['Victory', 'Shelter'];
}

Card.classes.set('OvergrownEstate', OvergrownEstate);
