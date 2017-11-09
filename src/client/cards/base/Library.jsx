import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Library extends Card {
  static description = 'Draw until you have 7 cards in hand, skipping any Action cards you choose to; set those aside, discarding them afterwards.'
  static cost = <Coin>5</Coin>
  static types = ['Action'];
}

Card.classes.set('Library', Library);
