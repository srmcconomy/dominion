import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Scout extends Card {
  static cost = <Coin>4</Coin>;
  static description = (
    <div>
      <div><strong>+1 Action</strong></div>
      <div>Reveal the top 4 cards of your deck. Put the revealed Victory cards into your hand. Put the other cards on top of your deck in any order.</div>
    </div>
  );
  static types = ['Action'];
}
