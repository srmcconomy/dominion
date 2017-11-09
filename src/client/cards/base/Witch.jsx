import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Witch extends Card {
  static description = <div>
  <p><strong>+2 Crads</strong></p>
  <p>Each other player gains a Curse.</p>
  </div>
  static cost = <Coin>5</Coin>
  static types = ['Action', 'Attack'];
}

Card.classes.set('Witch', Witch);
