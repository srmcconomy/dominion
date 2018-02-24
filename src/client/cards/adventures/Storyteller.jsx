import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Storyteller extends Card {
  static description = (
    <div>
      <div><strong>+1 Action</strong></div>
      <div>+<Coin>1</Coin></div>
      <div>Play up to 3 Treasures from your hand. Then pay all of your <Coin /> (including the <Coin>1</Coin> from this) and draw a card per <Coin>1</Coin> you paid.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action'];
}
