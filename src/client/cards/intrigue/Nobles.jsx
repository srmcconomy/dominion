import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Nobles extends Card {
  static cost = <Coin>6</Coin>;
  static description = (
    <div>
      <div>Choose one: <strong>+3 Cards</strong>; or <strong>+2 Actions</strong></div>
      <div>---</div>
      <div>2 VP</div>
    </div>
  );
  static types = ['Action', 'Victory'];
}
