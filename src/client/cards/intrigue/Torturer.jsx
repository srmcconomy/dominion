import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Torturer extends Card {
  static cost = <Coin>5</Coin>;
  static description = (
    <div>
      <div><strong>+3 Cards</strong></div>
      Each other player either discards 2 cards or gains a Curse to their hand, their choice. (They may pick an option they can't do.)
    </div>
  );
  static types = ['Action', 'Attack'];
}
