import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Exorcist extends Card {
  static description = (
    <div>
      <div>Trash a card from your hand. Gain a cheaper Spirit from one of the Spirit piles.</div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Night'];
}

Card.classes.set('Exorcist', Exorcist);
