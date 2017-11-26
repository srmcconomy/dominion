import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class SeaHag extends Card {
  static title = 'Sea Hag'
  static description = 'Each other player discards the top card of their deck, then gains a Curse onto their deck.';
  static cost = <Coin>4</Coin>
  static types = ['Action','Attack'];
}

Card.classes.set('SeaHag', SeaHag);
