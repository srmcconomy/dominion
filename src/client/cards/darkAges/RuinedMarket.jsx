import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class RuinedMarket extends Card {
  static title = 'Ruined Market';
  static description = (
    <div>
      <div><strong>+1 Buy</strong></div>
    </div>
  );
  static cost = <Coin>0</Coin>
  static types = ['Action', 'Ruins'];
}

Card.classes.set('RuinedMarket', RuinedMarket);
