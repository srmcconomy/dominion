import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class SecretPassage extends Card {
  static cost = <Coin>4</Coin>;
  static description = (
    <div>
      <div>+2 Cards</div>
      <div>+2 Cards</div>
      <div>Take a card from your hand and put it anywhere in your deck.</div>
    </div>
  );
  static types = ['Action'];
}
