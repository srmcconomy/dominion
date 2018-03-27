import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Envious extends Card {
  static description = (
    <div>
      <div>At the start of your Buy phase, return this, and Silver and Gold make <Coin>1</Coin> this turn.</div>
    </div>
  );
  static cost = <Coin>0</Coin>
  static types = ['State'];
}

Card.classes.set('Envious', Envious);
