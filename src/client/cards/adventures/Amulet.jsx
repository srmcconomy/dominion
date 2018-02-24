import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Amulet extends Card {
  static description = (
    <div>
      <div>Now and at the start of your next turn, choose one: +<Coin>1</Coin>; or trash a card from your hand; or gain a Silver.</div>
    </div>
  );
  static cost = <Coin>3</Coin>
  static types = ['Action', 'Duration'];
}
