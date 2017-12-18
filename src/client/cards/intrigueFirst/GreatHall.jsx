import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class GreatHall extends Card {
  static title = 'Great Hall';
  static cost = <Coin>3</Coin>;
  static description = (
    <div>
      <div><strong>+1 Card</strong></div>
      <div><strong>+1 Action</strong></div>
      <div>---------------</div>
      <div>1 VP</div>
    </div>
  );
  static types = ['Action', 'Victory'];
}
