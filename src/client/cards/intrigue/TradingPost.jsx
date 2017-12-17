import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class TradingPost extends Card {
  static title = 'Trading Post';  
  static cost = <Coin>5</Coin>;
  static description = (
    <div>
      Trash 2 cards from your hand. If you did, gain a Silver to your hand.
    </div>
  );
  static types = ['Action'];
}
