import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Patrol extends Card {
  static cost = <Coin>5</Coin>;
  static description = (
    <div>
      <div><strong>+3 Cards</strong></div>
      <div>Reveal the top 4 cards of your deck. Put the Victory cards and Curses into your hand. Put the rest back in any order.</div>
    </div>
  );
  static types = ['Action'];
}
