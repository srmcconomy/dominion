import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Chapel extends Card {
  static description = (<div>Trash up to 4 cards from your hand.</div>);
  static cost = <Coin>2</Coin>
  static types = ['Action'];
}
