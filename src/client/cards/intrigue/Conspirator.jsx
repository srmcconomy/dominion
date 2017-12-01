import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Conspirator extends Card {
  static cost = <Coin>4</Coin>;
  static description = (
    <div>
      <div>+<Coin>2</Coin></div>
      <div>If you've played 3 or more Actions this turn (counting this), <strong>+1 Card</strong> and <strong>+1 Action</strong>.</div>
    </div>
  );
  static types = ['Action'];
}
