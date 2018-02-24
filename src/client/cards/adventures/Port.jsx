import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';

export default class Port extends Card {
  static description = (
    <div>
      <div><strong>+1 Card</strong></div>
      <div><strong>+2 Actions</strong></div>
      <Line />
      <div>When you buy this, gain another Port.</div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Action'];
}
