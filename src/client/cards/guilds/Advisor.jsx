import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Advisor extends Card {
  static description = (
    <div>
      <div><strong>+1 Action</strong></div>
      <div>Reveal the top 3 cards of your deck. The player to your left chooses one of them. Discard that card. Put the other cards into your hand.</div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Action'];
}

Card.classes.set('Advisor', Advisor);
