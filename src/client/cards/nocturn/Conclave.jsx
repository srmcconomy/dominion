import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Conclave extends Card {
  static description = (
    <div>
      <div>+<Coin>2</Coin></div>
      <div>You may play an Action card from your hand that you don't have a copy of in play. If you do, <strong>+1 Action</strong>.</div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Action'];
}

Card.classes.set('Conclave', Conclave);
