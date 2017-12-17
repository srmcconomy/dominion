import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Replace extends Card {
  static cost = <Coin>5</Coin>;
  static description = (
    <div>
      Trash a card from your hand. Gain a card costing up to <Coin>2</Coin> more than it. If the gained card is an Action or Treasure, put it onto your deck; if it's a Victory card, each other player gains a Curse.
    </div>
  );
  static types = ['Action', 'Attack'];
}
