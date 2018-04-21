import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class SecretCave extends Card {
  static title = 'Secret Cave'
  static description = (
    <div>
      <div><strong>+1 Card</strong></div>
      <div><strong>+1 Action</strong></div>
      <div>You may discard 3 cards. If you did, then at the start of your next turn, +<Coin>3</Coin>.</div>
      <div><em>Heirloom: Magic Lamp</em></div>
    </div>
  );
  static cost = <Coin>3</Coin>
  static types = ['Action', 'Duration'];
}

Card.classes.set('SecretCave', SecretCave);
