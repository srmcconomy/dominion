import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Smithy extends Card {
  static description = <strong>+3 Cards</strong>
  static cost = <Coin>4</Coin>
  static types = ['Action'];
}

Card.classes.set('Smithy', Smithy);
