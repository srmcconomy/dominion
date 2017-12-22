import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Island extends Card {
  static description = (
    <div>
      <div>Put this and a card from your hand onto your Island mat.</div>
      <div>------------</div>
      <div><strong>2</strong> VP</div>
    </div>
	);
  static cost = <Coin>4</Coin>
  static types = ['Action', 'Victory'];

}

Card.classes.set('Island', Island);
