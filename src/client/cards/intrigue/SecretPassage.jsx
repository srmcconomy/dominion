import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class SecretPassage extends Card {
  static cost = <Coin>4</Coin>;
  static description = (
    <div>
      <div><strong>+2 Cards</strong></div>
      <div><strong>+1 Action</strong></div>
      <div>Take a card from your hand and put it anywhere in your deck.</div>
    </div>
  );
  static types = ['Action'];
}
