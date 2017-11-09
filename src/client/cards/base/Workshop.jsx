import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Workshop extends Card {
  static description = <div>
  Gain a card costing up to <Coin>4</Coin>.
  </div>
  static cost = <Coin>3</Coin>
  static types = ['Action'];
}

Card.classes.set('Workshop', Workshop);
