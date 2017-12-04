import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Bandit extends Card {
  static description = (<div>
  Gain a Gold. Each other player reveals the top 2 cards of their deck, trashes a revealed Treasure other than Copper, and discards the rest.
  </div>);
  static cost = <Coin>5</Coin>
  static types = ['Action','Attack'];
}

Card.classes.set('Bandit', Bandit);
