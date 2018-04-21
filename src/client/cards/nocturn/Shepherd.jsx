import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Shepherd extends Card {
  static description = (
    <div>
      <div><strong>+1 Action</strong></div>
      <div>Discard any number of Victory cards, revealing them. <strong>+2 Cards</strong> per card discarded.</div>
      <div><em>Heirloom: Pasture</em></div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Action'];
}

Card.classes.set('Shepherd', Shepherd);
