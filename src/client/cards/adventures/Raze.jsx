import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Raze extends Card {
  static description = (
    <div>
      <div><strong>+1 Action</strong></div>
      <div>Trash this or a card from your hand. Look at on card from the top of your deck per <Coin>1</Coin> the trashed card costs. Put one of them into your hand and discard the rest.</div>
    </div>
  );
  static cost = <Coin>2</Coin>
  static types = ['Action'];
}
