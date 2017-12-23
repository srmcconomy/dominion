import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Duke extends Card {
  static description = (
    <div>
      Worth 1VP.png per Duchy you have.
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Victory'];
}

Card.classes.set('Duke', Duke);
