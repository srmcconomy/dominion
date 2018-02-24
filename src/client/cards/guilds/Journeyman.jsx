import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Journeyman extends Card {
  static description = (
    <div>
      <div>Name a card. Reveal cards from the top of your deck until you reveal 3 cards that are not the named card. Put those cards into your hand and discard the rest.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action'];
}

Card.classes.set('Journeyman', Journeyman);
