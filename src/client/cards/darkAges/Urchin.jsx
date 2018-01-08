import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Urchin extends Card {
  static description = (
    <div>
      <div><strong>+1 Card</strong></div>
      <div><strong>+1 Action</strong></div>
      <div>Each other player discards down to 4 cards in hand.</div>
      <div>---------------</div>
      <div>When you play another Attack card with this in play, you first may trash this, to gain a Mercenary from the Mercenary pile.</div>
    </div>
  );
  static cost = <Coin>3</Coin>
  static types = ['Action', 'Attack'];
}

Card.classes.set('Urchin', Urchin);
