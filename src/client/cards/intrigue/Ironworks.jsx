import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Ironworks extends Card {
  static cost = <Coin>4</Coin>;
  static description = (
    <div>
      <div>Gain a card costing up to <Coin>3</Coin>.</div>
      <div>If the gained card is an...</div>
      <div>Action Card, <strong>+1 Action</strong></div>
      <div>Treasure Card, +<Coin>1</Coin></div>
      <div>Victory Card, <strong>+1 Card</strong></div>
    </div>
  );
  static types = ['Action'];
}
