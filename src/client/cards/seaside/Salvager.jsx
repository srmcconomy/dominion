import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Salvager extends Card {
  static description = (
    <div>
      <div><strong>+1 Buy</strong></div>
      <div>Trash a card from your hand. +<Coin>1</Coin> per <Coin>1</Coin> it costs.</div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Action'];
}

Card.classes.set('Salvager', Salvager);
