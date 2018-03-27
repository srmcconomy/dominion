import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Delusion extends Card {
  static description = (
    <div>
      <div>If you don\'t have Deluded or Envious, take Deluded.</div>
    </div>
  );
  static cost = <Coin>0</Coin>
  static types = ['Hex'];
}

Card.classes.set('Delusion', Delusion);
