import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Doctor extends Card {
  static description = (
    <div>
      <div>Name a card. Reveal the top 3 cards of your deck. Trash the matches. Put the rest back on top in any order.</div>
      <div>-----------------------</div>
      <div>When you buy this, you may overpay for it. For each <Coin>1</Coin> you overpaid, look at the top card of your deck; trash it, discard it, or put it back.</div>
    </div>
  );
  static cost = <Coin>3+</Coin>
  static types = ['Action'];
}

Card.classes.set('Doctor', Doctor);
