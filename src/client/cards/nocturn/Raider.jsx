import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Raider extends Card {
  static description = (
    <div>
      <div>Each other player with 5 or more cards in hand discards a copy of a card you have in play (or reveals they can't).</div>
      <div>At the start of your next turn, +<Coin>3</Coin>.</div>
    </div>
  );
  static cost = <Coin>6</Coin>
  static types = ['Night', 'Duration', 'Attack'];
}

Card.classes.set('Raider', Raider);
