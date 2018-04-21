import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Werewolf extends Card {
  static description = (
    <div>
      <div>If it's your Night phase, each other player receives the next Hex.</div>
      <div>Otherwise, <strong>+3 Cards</strong>.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action', 'Night', 'Attack', 'Doom'];
}

Card.classes.set('Werewolf', Werewolf);
