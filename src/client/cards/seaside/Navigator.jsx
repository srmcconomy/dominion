import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Navigator extends Card {
  static description = (
    <div>
      <div>+<Coin>2</Coin></div>
      <div>Look at the top 5 cards of your deck. Either discard them all, or put them back in any order.</div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Action'];
}

Card.classes.set('Navigator', Navigator);
