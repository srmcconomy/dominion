import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';

export default class LostCity extends Card {
  static title = 'Lost City';
  static description = (
    <div>
      <div><strong>+2 Card</strong></div>
      <div><strong>+2 Action</strong></div>
      <Line />
      <div>When you gain this, each other player draws a card.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action'];
}
