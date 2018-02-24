import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Baker extends Card {
  static description = (
    <div>
      <div><strong>+1 Card</strong></div>
      <div><strong>+1 Action</strong></div>
      <div>Take a Coin token.</div>
      <div>----------------</div>
      <div>Setup: Each player takes a Coin token.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action'];
}

Card.classes.set('Baker', Baker);
