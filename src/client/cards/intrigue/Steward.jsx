import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Steward extends Card {
  static title = 'Steward';
  static cost = <Coin>3</Coin>;
  static description = (
    <div>Choose one: <strong>+2 Cards</strong>; or +<Coin>2</Coin>; or trash 2 cards from your hand.</div>
  );
  static types = ['Action'];
}
