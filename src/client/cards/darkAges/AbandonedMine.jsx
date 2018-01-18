import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class AbandonedMine extends Card {
  static title = 'Abandoned Mine';
  static description = (
    <div>
      <div>+<Coin>1</Coin></div>
    </div>
  );
  static cost = <Coin>0</Coin>
  static types = ['Action', 'Ruins'];
}

Card.classes.set('AbandonedMine', AbandonedMine);
