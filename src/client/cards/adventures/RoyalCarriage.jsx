import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';

export default class RoyalCarriage extends Card {
  static title = 'Royal Carriage';
  static description = (
    <div>
      <div><strong>+1 Action</strong></div>
      <div>Put this on your Tavern mat.</div>
      <Line />
      <div>Directly after you finish playing an Action card, if it's still in play, you may call this, to replay that Action.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action', 'Reserve'];
}
