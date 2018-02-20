import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Necropolis extends Card {
  static description = (
    <div>
      <div><strong>+2 Actions</strong></div>
    </div>
  );
  static cost = <Coin>1</Coin>
  static types = ['Action', 'Shelter'];
}

Card.classes.set('Necropolis', Necropolis);
