import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Smugglers extends Card {
  static description = (
    <div>
      <div>Gain a copy of a card costing up to <Coin>6</Coin> that the player to your right gained on their last turn.</div>
    </div>
  );
  static cost = <Coin>3</Coin>
  static types = ['Action'];
}

Card.classes.set('Smugglers', Smugglers);
