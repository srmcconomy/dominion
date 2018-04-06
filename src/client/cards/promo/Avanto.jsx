import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Avanto extends Card {
  static description = (
    <div>
      <div><strong>+3 Cards</strong></div>
      <div>You may play a Sauna from your hand.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action'];
}

Card.classes.set('Avanto', Avanto);
