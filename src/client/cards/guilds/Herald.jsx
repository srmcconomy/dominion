import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Herald extends Card {
  static description = (
    <div>
      <div><strong>+1 Card</strong></div>
      <div><strong>+1 Action</strong></div>
      <div>Reveal the top card of your deck. If it is an Action, play it.</div>
      <div>------------------</div>
      <div>When you buy this, you may overpay for it. For each <Coin>1</Coin> you overpaid, look through your discard pile and put a card from it on top of your deck.</div>
    </div>
  );
  static cost = <Coin>4+</Coin>
  static types = ['Action'];
}

Card.classes.set('Herald', Herald);
