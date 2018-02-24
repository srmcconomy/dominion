import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Hovel extends Card {
  static description = (
    <div> When you buy a Victory card, you may trash this from your hand.</div>
  );
  static cost = <Coin>1</Coin>
  static types = ['Reaction', 'Shelter'];
}

Card.classes.set('Hovel', Hovel);
