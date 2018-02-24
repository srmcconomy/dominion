import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Vassal extends Card {
  static description = (
    <div>
      <div>+<Coin>2</Coin></div>
      <div>Discard the top card of your deck. If it is an Action card, you may play it.</div>
    </div>
  );
  static cost = <Coin>3</Coin>
  static types = ['Action'];
}

Card.classes.set('Vassal', Vassal);
