import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Mercenary extends Card {
  static description = (
    <div>
      <div>You may trash 2 cards from your hand. If you did, <strong>+2 Cards</strong>, +<Coin>2</Coin>, and each other player discards down to 3 cards in hand.</div>
      <div><em>(This is not in the Supply.)</em></div>
    </div>
  );
  static cost = <Coin>0*</Coin>
  static types = ['Action', 'Attack'];
}

Card.classes.set('Mercenary', Mercenary);
