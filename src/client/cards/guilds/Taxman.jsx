import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Taxman extends Card {
  static description = (
    <div>
      <div>You may trash a Treasure from your hand. Each other player with 5 or more cards in hand discards a copy of it (or reveals a hand without it). Gain a Treasure card costing up to <Coin>3</Coin> more than the trashed card, putting it on top of your deck.</div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Action', 'Attack'];
}

Card.classes.set('Taxman', Taxman);
