import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Fairgrounds extends Card {
  static description = (
    <div>
      <div>Worth 2 VP for every 5 differently named cards in your deck (round down).</div>
    </div>
  );
  static cost = <Coin>6</Coin>
  static types = ['Victory'];
}

Card.classes.set('Fairgrounds', Fairgrounds);
