import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Imp extends Card {
  static description = (
    <div>
      <div><strong>+2 Cards</strong></div>
      <div>You may play an Action card from your hand that you don't have a copy of in play.</div>
      <div><em>(This is not in the Supply.)</em></div>
    </div>
  );
  static cost = <Coin>2*</Coin>
  static types = ['Action', 'Spirit'];
}

Card.classes.set('Imp', Imp);
