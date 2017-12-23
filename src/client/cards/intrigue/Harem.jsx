import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Harem extends Card {
  static cost = <Coin>6</Coin>;
  static value = <Coin>2</Coin>;
  static description = (
    <div>
      <div><Coin>2</Coin></div>
      <div>-------</div>
      <div>2 VP</div>
    </div>
  );
  static types = ['Treasure', 'Victory'];
}
