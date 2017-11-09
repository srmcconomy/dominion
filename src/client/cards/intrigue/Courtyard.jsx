import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Courtyard extends Card {
  static cost = <Coin>2</Coin>;
  static description = (
    <div>
      <p><strong>+3 Cards</strong></p>
      <p>Put a card from your hand onto your deck</p>
    </div>
  );
  static types = ['Action'];
}
