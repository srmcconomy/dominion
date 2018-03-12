import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Survivors extends Card {
  static description = (
    <div>
      <div>Look at the top 2 cards of your deck. Discard them or put them back in any order.</div>
    </div>
  );
  static cost = <Coin>0</Coin>
  static types = ['Action', 'Ruins'];
}

Card.classes.set('Survivors', Survivors);
