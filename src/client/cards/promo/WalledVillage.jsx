import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';

export default class WalledVillage extends Card {
  static title = 'Walled Village'
  static description = (
    <div>
      <div><strong>+1 Card</strong></div>
      <div><strong>+2 Actions</strong></div>
      <Line />
      <div>At the start of Clean-up, if you have this and no more than one other Action card in play, you may put this onto your deck.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action'];
}

Card.classes.set('WalledVillage', WalledVillage);
