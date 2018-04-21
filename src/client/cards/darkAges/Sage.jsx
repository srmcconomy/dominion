import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Sage extends Card {
  static description = (
    <div>
      <div><strong>+1 Action</strong></div>
      <div>Reveal cards from the top of your deck until you reveal one costing <Coin>3</Coin> or more. Put that card into your hand and discard the rest.</div>
    </div>
  );
  static cost = <Coin>3</Coin>
  static types = ['Action'];
}

Card.classes.set('Sage', Sage);
