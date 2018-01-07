import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class MarketSquare extends Card {
  static title = 'Market Square';
  static description = (
    <div>
      <div><strong>+1 Card</strong></div>
      <div><strong>+1 Action</strong></div>
      <div><strong>+1 Buy</strong></div>
      <div>---------------------</div>
      <div>When one of your cards is trashed, you may discard this from your hand to gain a Gold.</div>
    </div>
  );
  static cost = <Coin>3</Coin>
  static types = ['Action', 'Reaction'];
}

Card.classes.set('MarketSquare', MarketSquare);
