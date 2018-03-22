import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';

export default class BlessedVillage extends Card {
  static description = (
    <div>
      <div><strong>+1 Card</strong></div>
      <div><strong>+2 Actions</strong></div>
      <Line />
      <div>When you gain this, take a Boon. Receive it now or at the start of your next turn.</div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Action', 'Fate'];
}

Card.classes.set('BlessedVillage', BlessedVillage);
