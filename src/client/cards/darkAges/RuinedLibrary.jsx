import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class RuinedLibrary extends Card {
  static title = 'Ruined Library';
  static description = (
    <div>
      <div><strong>+1 Card</strong></div>
    </div>
  );
  static cost = <Coin>0</Coin>
  static types = ['Action', 'Ruins'];
}

Card.classes.set('RuinedLibrary', RuinedLibrary);
