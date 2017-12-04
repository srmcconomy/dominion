import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Gardens extends Card {
  static description = (<div>
  Worth 1 VP per 10 cards you have (round down).
  </div>);
  static cost = <Coin>4</Coin>
  static types = ['Victory'];

}

Card.classes.set('Gardens', Gardens);
