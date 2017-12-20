import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Harvest extends Card {
  static description = (
    <div>
      <div>Reveal the top 4 cards of your deck, then discard them. +<Coin>1</Coin> per differently named card revealed.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action'];
}

Card.classes.set('Harvest', Harvest);
