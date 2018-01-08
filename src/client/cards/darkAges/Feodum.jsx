import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Feodum extends Card {
  static description = (
    <div>
      <div>Worth 1VP.png per 3 Silvers you have (round down).</div>
      <div>---------------------</div>
      <div>When you trash this, gain 3 Silvers.</div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Victory'];
}

Card.classes.set('Feodum', Feodum);
