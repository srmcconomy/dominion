import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class War extends Card {
  static description = (
    <div>
      <div>Reveal cards from your deck until revealing one costing <Coin>3</Coin> or <Coin>4</Coin>. Trash it and discard the rest.</div>
    </div>
  );
  static cost = <Coin>0</Coin>
  static types = ['Hex'];
}

Card.classes.set('War', War);
