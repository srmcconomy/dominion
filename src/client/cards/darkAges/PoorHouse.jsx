import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class PoorHouse extends Card {
  static description = (
    <div>
      <div>+<Coin>4</Coin></div>
      <div>Reveal your hand. –<Coin>1</Coin> per Treasure card in your hand.</div>
      <div>(You can't go below <Coin>0</Coin>.)</div>
    </div>
  );
  static cost = <Coin>1</Coin>
  static types = ['Action'];
}

Card.classes.set('PoorHouse', PoorHouse);
