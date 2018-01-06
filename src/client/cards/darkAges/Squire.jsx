import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Squire extends Card {
  static description = (
    <div>
      <div>+<Coin>1</Coin></div>
      <div>Choose one: <strong>+2 Actions</strong>; or <strong>+2 Buys</strong>; or gain a Silver.</div>
      <div>-----------------</div>
      <div>When you trash this, gain an Attack card.</div>
    </div>
  );
  static cost = <Coin>2</Coin>
  static types = ['Action'];
}

Card.classes.set('Squire', Squire);
