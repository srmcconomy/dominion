import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class BanditCamp extends Card {
  static title = 'Bandit Camp'
  static description = (
    <div>
      <div><strong>+1 Card</strong></div>
      <div><strong>+2 Actions</strong></div>
      <div>Gain a Spoils from the Spoils pile.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action'];
}

Card.classes.set('BanditCamp', BanditCamp);
