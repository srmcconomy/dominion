import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Ghost extends Card {
  static description = (
    <div>
      <div>Reveal cards from your deck until you reveal an Action. Discard the other cards and set aside the Action. At the start of your next turn, play it twice.</div>
      <div><em>(This is not in the Supply.)</em></div>
    </div>
  );
  static cost = <Coin>4*</Coin>
  static types = ['Night', 'Duration', 'Spirit'];
}

Card.classes.set('Ghost', Ghost);
