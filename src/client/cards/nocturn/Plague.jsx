import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Plague extends Card {
  static description = (
    <div>
      <div>Gain a Curse to your hand.</div>
    </div>
  );
  static cost = <Coin>0</Coin>
  static types = ['Hex'];
}

Card.classes.set('Plague', Plague);
