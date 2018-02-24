import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class SwampHag extends Card {
  static title = 'Swamp Hag';
  static description = (
    <div>
      <div>Until your next turn, when any player buys a card, they gain a Curse. At thte start of your next turn, +<Coin>3</Coin></div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action', 'Attack', 'Duration'];
}
