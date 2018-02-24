import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Big from 'components/Big';

export default class TreasureTrove extends Card {
  static title = 'Treasure Trove';
  static description = (
    <div>
      <div><Big><Coin>2</Coin></Big></div>
      <div>When you play this, gain a Gold and a Copper.</div>
    </div>
  );
  static value = <Coin>2</Coin>
  static cost = <Coin>5</Coin>
  static types = ['Treasure'];
}
