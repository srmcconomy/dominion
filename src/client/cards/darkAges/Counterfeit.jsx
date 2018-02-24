import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Counterfeit extends Card {
  static description = (
    <div>
      <div><Coin>1</Coin></div>
      <div><strong>+1 Buy</strong></div>
      <div>When you play this, you may play a Treasure from your hand twice. If you do, trash that Treasure.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static value = <Coin>1</Coin>;
  static types = ['Treasure'];
}

Card.classes.set('Counterfeit', Counterfeit);
