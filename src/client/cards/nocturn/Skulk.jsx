import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';

export default class Skulk extends Card {
  static description = (
    <div>
      <div><strong>+1 Buy</strong></div>
      <div>Each other player receives the next Hex.</div>
      <Line />
      <div>When you gain this, gain a Gold.</div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Action', 'Attack', 'Doom'];
}

Card.classes.set('Skulk', Skulk);
