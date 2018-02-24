import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Mystic extends Card {
  static description = (
    <div>
      <div><strong>+1 Action</strong></div>
      <div>+<Coin>2</Coin></div>
      <div>Name a card, then reveal the top card of your deck. If you named it, put it into your hand.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action'];
}

Card.classes.set('Mystic', Mystic);
