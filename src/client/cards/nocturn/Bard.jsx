import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Bard extends Card {
  static description = (
    <div>
      <div>+<Coin>2</Coin></div>
      <div>Receive a Boon.</div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Action', 'Fate'];
}

Card.classes.set('Bard', Bard);
