import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class WillOWisp extends Card {
  static title = 'Will-O\'-Wisp'
  static description = (
    <div>
      <div><strong>+1 Card</strong></div>
      <div><strong>+1 Action</strong></div>
      <div>Reveal the top card of your deck. If it costs <Coin>2</Coin> or less, put it into your hand.</div>
      <div><em>(This is not in the Supply.)</em></div>
    </div>
  );
  static cost = <Coin>0*</Coin>
  static types = ['Action', 'Spirit'];
}

Card.classes.set('WillOWisp', WillOWisp);
