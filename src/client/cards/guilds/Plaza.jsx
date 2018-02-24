import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Plaza extends Card {
  static description = (
    <div>
      <div><strong>+1 Card</strong></div>
      <div><strong>+2 Actions</strong></div>
      <div>You may discard a Treasure card. If you do, take a Coin token.</div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Action'];
}

Card.classes.set('Plaza', Plaza);
