import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class GhostShip extends Card {
  static description = (
    <div>
      <div><strong>+2 Cards</strong></div>
      <div>Each other player with 4 or more cards in hand puts cards from their hand onto their deck until they have 3 cards in hand.</div>
    </div>
    );
  static cost = <Coin>5</Coin>
  static types = ['Action', 'Attack'];
}

Card.classes.set('GhostShip', GhostShip);
