import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Sentry extends Card {
  static description = <div>
  <p><strong>+1 Card</strong></p>
  <p><strong>+1 Action</strong></p>
  <p>Look at the top 2 cards of your deck. Trash and/or discard any number of them. Put the rest back on top in any order.</p>
  </div>
  static cost = <Coin>5</Coin>
  static types = ['Action'];
}

Card.classes.set('Sentry', Sentry);
