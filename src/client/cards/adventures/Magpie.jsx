import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Magpie extends Card {
  static description = (
    <div>
      <div><strong>+1 Card</strong></div>
      <div><strong>+1 Action</strong></div>
      <div>Reveal the top card of your deck. If it's a Treasure, put it into your hand. If it's an Action or a Victory card, gain a Magpie.</div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Action'];
}
