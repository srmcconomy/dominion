import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class SacredGrove extends Card {
  static description = (
    <div>
      <div><strong>+1 Buy</strong></div>
      <div>+<Coin>3</Coin></div>
      <div>Receive a Boon. If it doesn\t give +<Coin>1</Coin>, each other player may receive it.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action', 'Fate'];
}

Card.classes.set('SacredGrove', SacredGrove);
