import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Artisan extends Card {
  static description = (
    <div>
      <div>Gain a card to your hand costing up to <Coin>5</Coin>.</div>
      <div>Put a card from your hand onto your deck.</div>
    </div>
  );
  static cost = <Coin>6</Coin>
  static types = ['Action'];
}

Card.classes.set('Artisan', Artisan);
