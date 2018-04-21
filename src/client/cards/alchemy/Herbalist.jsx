import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';

export default class Herbalist extends Card {
  static description = (
    <div>
      <div><strong>+1 Buy</strong></div>
      <div>+<Coin>1</Coin></div>
      <Line />
      <div>When you discard this from play, you may put one of your Treasures from play onto your deck.</div>
    </div>
  );
  static cost = <Coin>2</Coin>
  static types = ['Action'];
}

Card.classes.set('Herbalist', Herbalist);
