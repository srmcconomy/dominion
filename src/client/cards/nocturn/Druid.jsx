import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';

export default class Druid extends Card {
  static description = (
    <div>
      <div><strong>+1 Buy</strong></div>
      <div>Receive one of the set-aside Boons (leaving it there).</div>
      <Line />
      <div>Setup: Set aside the top 3 Boons face up.</div>
    </div>
  );
  static cost = <Coin>2</Coin>
  static types = ['Action', 'Fate'];
}

Card.classes.set('Druid', Druid);
