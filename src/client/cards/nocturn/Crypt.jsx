import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Crypt extends Card {
  static description = (
    <div>
      <div>Set aside any number of Treasures you have in play, face down (under this). While any remain, at the start of each of your turns, put one of them into your hand.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Night', 'Duration'];
}

Card.classes.set('Crypt', Crypt);
