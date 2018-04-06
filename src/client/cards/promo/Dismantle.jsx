import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Dismantle extends Card {
  static description = (
    <div>
      <div>Trash a card from your hand. If it costs <Coin>1</Coin> or more, gain a cheaper card and a Gold.</div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Action'];
}

Card.classes.set('Dismantle', Dismantle);
