import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Envoy extends Card {
  static description = (
    <div>
      <div>Reveal the top 5 cards of your deck. The player to your left chooses one. Discard that one and put the rest into your hand.</div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Action'];
}

Card.classes.set('Envoy', Envoy);
