import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Famine extends Card {
  static description = (
    <div>
      <div>Reveal the top 3 cards of your deck. Discard the Actions. Shuffle the rest into your deck.</div>
    </div>
  );
  static cost = <Coin>0</Coin>
  static types = ['Hex'];
}

Card.classes.set('Famine', Famine);
