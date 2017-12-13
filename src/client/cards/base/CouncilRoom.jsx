import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class CouncilRoom extends Card {
  static title = 'Council Room'
  static description = (
    <div>
      <div><strong>+4 Cards</strong></div>
      <div><strong>+1 Buy</strong></div>
      <div>Each other player draws a card.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action'];
}

Card.classes.set('CouncilRoom', CouncilRoom);
