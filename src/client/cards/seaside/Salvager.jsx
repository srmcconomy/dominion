import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Salvager extends Card {
  static description = <div>
  <p><strong>+1 Buy</strong></p>
  <p>Trash a card from your hand. +<Coin>1</Coin> per <Coin>1</Coin> it costs.</p>
  </div>
  static cost = <Coin>4</Coin>
  static types = ['Action'];
}

Card.classes.set('Salvager', Salvager);
