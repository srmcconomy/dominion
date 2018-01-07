import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Tournament extends Card {
  static description = (
    <div>
      <div><strong>+1 Action</strong></div>
      <div>Each player may reveal a Province from his hand. If you do, discard it and gain a Prize (from the Prize pile) or a Duchy, putting it on top of your deck. If no-one else does, +1 Card, +<Coin>1</Coin>.</div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Action'];
}

Card.classes.set('Tournament', Tournament);
