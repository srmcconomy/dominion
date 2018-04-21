import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';

export default class MerchantGuild extends Card {
  static title = 'Merchant Guild'
  static description = (
    <div>
      <div><strong>+1 Buy</strong></div>
      <div>+<Coin>1</Coin></div>
      <Line />
      <div>While this is in play, when you buy a card, take a Coin token.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action'];
}

Card.classes.set('MerchantGuild', MerchantGuild);
