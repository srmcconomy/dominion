import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class PirateShip extends Card {
  static title = 'Pirate Ship'
  static description = (
    <div>Choose one: +<Coin>1</Coin> per Coin token on your Pirate Ship mat; or each other player reveals the top 2 cards of their deck, trashes one of those Treasures that you choose, and discards the rest, and then if anyone trashed a Treasure you add a Coin token to your Pirate Ship mat.</div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Action', 'Attack'];
}

Card.classes.set('PirateShip', PirateShip);
