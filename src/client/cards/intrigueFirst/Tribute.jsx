import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Tribute extends Card {
  static cost = <Coin>5</Coin>;
  static description = (
    <div>
      <div>The player to your left reveals then discards the top 2 cards of his deck. For each differently named card revealed, if it is an…</div>
      <div>Action Card, +2 Actions</div>
      <div>Treasure Card, +<Coin>2</Coin></div>
      <div>Victory Card, +2 Cards</div>
    </div>
  );
  static types = ['Action'];
}
