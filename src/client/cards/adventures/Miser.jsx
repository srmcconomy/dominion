import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Miser extends Card {
  static description = (
    <div>
      <div>Choose one: Put a Copper from your hand onto your Tavern mat; or +<Coin>1</Coin> per Copper on your Tavern mat.</div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Action'];
}
