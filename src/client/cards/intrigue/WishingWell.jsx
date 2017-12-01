import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class WishingWell extends Card {
  static title = 'Wishing Well'
  static cost = <Coin>3</Coin>;
  static description = (
    <div>
      <div>+1 Card</div>
      <div>+1 Action</div>
      <div>Name a card, then reveal the top card of your deck.  If you named it, put it into your hand.</div>
    </div>
  );
  static types = ['Action'];
}
