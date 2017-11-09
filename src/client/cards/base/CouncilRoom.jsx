import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class CouncilRoom extends Card {
  static title = 'Council Room'
  static description = <div>
  <p><strong>+4 Cards</strong></p>
  <p><strong>+1 Buy</strong></p>
  <p>Each other player draws a card.</p>
  </div>
  static cost = <Coin>5</Coin>
  static types = ['Action'];
}

Card.classes.set('CouncilRoom', CouncilRoom);
