import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Rebuild extends Card {
  static description = (
    <div>
      <div><strong>+1 Action</strong></div>
      <div>Name a card. Reveal cards from your deck until you reveal a Victory card you did not name. Discard the rest, trash the Victory card, and gain a Victory card costing up to <Coin>3</Coin> more than it.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action'];
}

Card.classes.set('Rebuild', Rebuild);
