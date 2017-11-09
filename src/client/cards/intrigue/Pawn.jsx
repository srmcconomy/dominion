import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Pawn extends Card {
  static cost = <Coin>2</Coin>;
  static description = (
    <div>
      <span>Choose two: +1 Card; +1 Action; +1 Buy, +<Coin>1</Coin>. The choices must be different</span>
    </div>
  );
  static types = ['Action'];
}
