import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Menagerie extends Card {
  static description = (
    <div>
      <div><strong>+1 Action</strong></div>
      <div>Reveal your hand. If there are no duplicate cards in it, +3 Cards. Otherwise, +1 Card.</div>
    </div>
  );
  static cost = <Coin>3</Coin>
  static types = ['Action'];
}

Card.classes.set('Menagerie', Menagerie);
