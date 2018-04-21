import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Pillage extends Card {
  static description = (
    <div>
      <div>Trash this. Each other player with 5 or more cards in hand reveals their hand and discards a card that you choose. Gain 2 Spoils from the Spoils pile.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action', 'Attack'];
}

Card.classes.set('Pillage', Pillage);
