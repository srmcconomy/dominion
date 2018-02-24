import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Artificer extends Card {
  static description = (
    <div>
      <div><strong>+1 Card</strong></div>
      <div><strong>+1 Action</strong></div>
      <div>+<Coin>1</Coin></div>
      <div>Discard any number of cards. You may gain a card onto your deck costing exactly <Coin>1</Coin> per card discarded.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action'];
}
