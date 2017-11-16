import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class FishingVillage extends Card {
  static title = 'Fishing Village'
  static description = <div>
  <p><strong>+2 Actions</strong></p>
  <p>+<Coin>1</Coin></p>
  <p>At the start of your next turn: <strong>+1 Action</strong> and +<Coin>1</Coin>.</p>
  </div>
  static cost = <Coin>3</Coin>
  static types = ['Action', 'Duration'];
}

Card.classes.set('FishingVillage', FishingVillage);
