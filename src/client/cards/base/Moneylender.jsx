import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Moneylender extends Card {
  static description = (<div>
  You may trash a Copper from your hand for +<Coin>3</Coin>
  </div>);
  static cost = <Coin>4</Coin>
  static types = ['Action'];
}

Card.classes.set('Moneylender', Moneylender);
