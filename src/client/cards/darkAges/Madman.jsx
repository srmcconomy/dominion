import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Madman extends Card {
  static description = (
    <div>
      <div><strong>+2 Actions</strong></div>
      <div>Return this to the Madman pile. If you do, <strong>+1 Card</strong> per card in your hand.</div>
      <div><em>(This is not in the Supply.)</em></div>
    </div>
  );
  static cost = <Coin>0*</Coin>
  static types = ['Action'];
}

Card.classes.set('Madman', Madman);
