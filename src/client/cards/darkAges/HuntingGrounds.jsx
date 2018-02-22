import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';

export default class HuntingGrounds extends Card {
  static title = 'Hunting Grounds'
  static description = (
    <div>
      <div><strong>+4 Cards</strong></div>
      <Line />
      <div>When you trash this, gain a Duchy or 3 Estates.</div>
    </div>
  );
  static cost = <Coin>6</Coin>
  static types = ['Action'];
}

Card.classes.set('HuntingGrounds', HuntingGrounds);
