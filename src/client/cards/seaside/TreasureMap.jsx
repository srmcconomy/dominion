import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class TreasureMap extends Card {
  static title = 'Treasure Map'
  static description = 'Trash this and a Treasure Map from your hand. If you trashed two Treasure Maps, gain 4 Golds onto your deck.';
  static cost = <Coin>4</Coin>
  static types = ['Action'];
}

Card.classes.set('TreasureMap', TreasureMap);
