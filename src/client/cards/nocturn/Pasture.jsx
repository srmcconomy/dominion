import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Medium from 'components/Medium';
import Line from 'components/Line';
import VP from 'components/VP';

export default class Pasture extends Card {
  static description = (
    <div>
      <Medium><div><Coin>1</Coin></div></Medium>
      <Line />
      <div>Worth 1 <VP />  per Estate you have.</div>
    </div>
  );
  static cost = <Coin>2</Coin>
  static types = ['Treasure', 'Victory', 'Heirloom'];
}

Card.classes.set('Pasture', Pasture);
