import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Coppersmith extends Card {
  static cost = <Coin>4</Coin>;
  static description = (
    <div>
      <div>Copper produces an extra <Coin>1</Coin> this turn.</div>
    </div>
  );
  static types = ['Action'];
}
