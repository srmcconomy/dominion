import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Courtyard extends Card {
  static cost = <Coin>2</Coin>;
  static description = (
    <div>
      <span>+3 Cards</span>
      <span>Put a card from your hand onto your deck</span>
    </div>
  );
  static types = ['Action'];
}

Card.classes.set('Courtyard', Courtyard);
