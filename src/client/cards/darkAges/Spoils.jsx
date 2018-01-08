import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Spoils extends Card {
  static description = (
    <div>
      <div><Coin>3</Coin></div>
      <div>When you play this, return it to the Spoils pile.</div>
      <div><em>(This is not in the Supply.)</em></div>
    </div>
  );
  static cost = <Coin>0*</Coin>
  static types = ['Treasure'];
}

Card.classes.set('Spoils', Spoils);
