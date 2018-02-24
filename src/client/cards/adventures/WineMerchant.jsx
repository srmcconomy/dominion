import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';

export default class WineMerchant extends Card {
  static title = 'Wine Merchant';
  static description = (
    <div>
      <div>+<Coin>4</Coin></div>
      <div><strong>+1 Buy</strong></div>
      <div>Put this on your Tavern mat.</div>
      <Line />
      <div>At the end of your Buy phase, if you have at least <Coin>2</Coin> unspent, you may discard this from your Tavern mat.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action', 'Reserve'];
}
