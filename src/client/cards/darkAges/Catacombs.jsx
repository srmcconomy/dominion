import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';

export default class Catacombs extends Card {
  static description = (
    <div>
      <div>Look at the top 3 cards of your deck. Choose one: Put them into your hand; or discard them and <strong>+3 Cards</strong>.</div>
      <Line />
      <div>When you trash this, gain a cheaper card.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action'];
}

Card.classes.set('Catacombs', Catacombs);
