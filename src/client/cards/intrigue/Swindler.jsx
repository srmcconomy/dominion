import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Swindler extends Card {
  static cost = <Coin>3</Coin>;
  static description = (
    <div>
      <div>+<Coin>2</Coin></div>
      <div>Each other player trashes the top card of their deck and gains a card with the same cost that you choose</div>
    </div>
  );
  static types = ['Action', 'Attack'];
}
