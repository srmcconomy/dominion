import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class RuinedVillage extends Card {
  static title = 'Ruined Village';
  static description = (
    <div>
      <div><strong>+1 Action</strong></div>
    </div>
  );
  static cost = <Coin>0</Coin>
  static types = ['Action', 'Ruins'];
}

Card.classes.set('RuinedVillage', RuinedVillage);
