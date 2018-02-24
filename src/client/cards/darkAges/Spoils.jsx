import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Medium from 'components/Medium';

export default class Spoils extends Card {
  static description = (
    <div>
      <Medium><div><Coin>3</Coin></div></Medium>
      <div>When you play this, return it to the Spoils pile.</div>
      <div><em>(This is not in the Supply.)</em></div>
    </div>
  );
  static cost = <Coin>0*</Coin>
  static value = <Coin>3</Coin>;
  static types = ['Treasure'];
}

Card.classes.set('Spoils', Spoils);
