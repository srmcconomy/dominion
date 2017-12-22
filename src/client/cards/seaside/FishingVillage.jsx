import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class FishingVillage extends Card {
  static title = 'Fishing Village'
  static description = (
    <div>
      <div><strong>+2 Actions</strong></div>
      <div>+<Coin>1</Coin></div>
      <div>At the start of your next turn: <strong>+1 Action</strong> and +<Coin>1</Coin>.</div>
    </div>
  );
  static cost = <Coin>3</Coin>
  static types = ['Action', 'Duration'];
}

Card.classes.set('FishingVillage', FishingVillage);
