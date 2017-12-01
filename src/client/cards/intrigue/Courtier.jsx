import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Courtier extends Card {
  static cost = <Coin>5</Coin>;
  static description = (
    <div>
      Reveal a card from your hand. For each type it has (Action, Attack, etc.), choose one: <strong>+1 Action</strong>; or <strong>+1 Buy</strong>; or +<Coin>3</Coin>; or gain a Gold. The choices must be different.
    </div>
  );
  static types = ['Action'];
}
