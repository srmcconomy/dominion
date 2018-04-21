import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Soothsayer extends Card {
  static description = (
    <div>
      <div>Gain a Gold. Each other player gains a Curse. Each player who did draws a card.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action', 'Attack'];
}

Card.classes.set('Soothsayer', Soothsayer);
