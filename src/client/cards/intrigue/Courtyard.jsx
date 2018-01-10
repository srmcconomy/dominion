import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Courtyard extends Card {
  static cost = <Coin>2</Coin>;
  static description = (
    <div>
      <div><strong>+3 Cards</strong></div>
      <div>Put a card from your hand onto your deck</div>
    </div>
  );
  static types = ['Action'];
}
