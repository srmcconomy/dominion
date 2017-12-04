import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Lookout extends Card {
  static description = (<div>
  <div><strong>+1 Action</strong></div>
  <div>Look at the top 3 cards of your deck. Trash one of them. Discard one of them. Put the other one back on top of your deck.</div>
  </div>);
  static cost = <Coin>3</Coin>
  static types = ['Action'];
}

Card.classes.set('Lookout', Lookout);
