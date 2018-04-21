import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Envy extends Card {
  static description = (
    <div>
      <div>If you dont have Deluded or Envious, take Envious.</div>
    </div>
  );
  static cost = <Coin>0</Coin>
  static types = ['Hex'];
}

Card.classes.set('Envy', Envy);
