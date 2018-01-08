import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Procession extends Card {
  static description = (
    <div>
      <div>You may play an action card from your hand twice. Trash it. Gain an Action card costing exactly <Coin>1</Coin> more than it.</div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Action'];
}

Card.classes.set('Procession', Procession);
