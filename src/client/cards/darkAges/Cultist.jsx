import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Cultist extends Card {
  static description = (
    <div>
      <div><strong>+2 Cards</strong></div>
      <div>Each other player gains a Ruins. You may play a Cultist from your hand.</div>
      <div>------------------</div>
      <div>When you trash this, <strong>+3 Cards</strong>.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action', 'Attack', 'Looter'];
}

Card.classes.set('Cultist', Cultist);
