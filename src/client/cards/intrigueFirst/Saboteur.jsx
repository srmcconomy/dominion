import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Saboteur extends Card {
  static cost = <Coin>5</Coin>;
  static description = (
    <div>
      <div>Each other player reveals cards from the top of his deck until revealing one costing <Coin>3</Coin> or more. He trashes that card and may gain a card costing at most <Coin>2</Coin> less than it. He discards the other revealed cards.</div>
    </div>
  );
  static types = ['Action', 'Attack'];
}
