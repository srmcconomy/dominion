import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Ironmonger extends Card {
  static description = (
    <div>
      <div><strong>+1 Card</strong></div>
      <div><strong>+1 Action</strong></div>
      <div>Reveal the top card of your deck; you may discard it. Either way, if it is an...</div>
      <div>Action card, <strong>+1 Action</strong></div>
      <div>Treasure card, +<Coin>1</Coin></div>
      <div>Victory card, <strong>+1 Card</strong></div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Action'];
}

Card.classes.set('Ironmonger', Ironmonger);
