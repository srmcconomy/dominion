import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';

export default class CursedVillage extends Card {
  static title = 'Cursed Village'
  static description = (
    <div>
      <div><strong>+2 Actions</strong></div>
      <div>Draw until you have 6 cards in hand.</div>
      <Line />
      <div>When you gain this, receive a Hex.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action', 'Doom'];
}

Card.classes.set('CursedVillage', CursedVillage);
