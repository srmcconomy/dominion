import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Medium from 'components/Medium';

export default class Diadem extends Card {
  static description = (
    <div>
      <Medium><div><Coin>2</Coin></div></Medium>
      <div>When you play this, +<Coin>1</Coin> per unused Action you have (Action, not Action card).</div>
      <div><em>(This is not in the Supply.)</em></div>
    </div>
  );
  static cost = <Coin>0*</Coin>
  static value = <Coin>2</Coin>;
  static types = ['Treasure', 'Prize'];
}

Card.classes.set('Diadem', Diadem);
