import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class FarmingVillage extends Card {
  static title = 'Farming Village';
  static description = (
    <div>
      <div><strong>+2 Actions</strong></div>
      <div>Reveal cards from the top of your deck until you reveal an Action or Treasure card. Put that card into your hand and discard the other cards.</div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Action'];
}

Card.classes.set('FarmingVillage', FarmingVillage);
