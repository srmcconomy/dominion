import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Pawn extends Card {
  static cost = <Coin>2</Coin>;
  static description = (
    <div>Choose two: <strong>+1 Card</strong>; <strong>+1 Action</strong>; <strong>+1 Buy</strong>; +<Coin>1</Coin>. The choices must be different</div>
  );
  static types = ['Action'];
}
