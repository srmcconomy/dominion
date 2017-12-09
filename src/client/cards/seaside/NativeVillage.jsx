import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class NativeVillage extends Card {
  static title = 'Native Village'
  static description = (<div>
  <div><strong>+2 Actions</strong></div>
  <div>Choose one: Put the top card of your deck face down on your Native Village mat (you may look at those cards at any time); or put all the cards from your mat into your hand.</div>
  </div>);
  static cost = <Coin>2</Coin>
  static types = ['Action'];
}

Card.classes.set('NativeVillage', NativeVillage);
