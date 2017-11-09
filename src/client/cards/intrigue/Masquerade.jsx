import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Masquerade extends Card {
  static cost = <Coin>3</Coin>;
  static description = (
    <div>
      <span>+2 Cards</span>
      <span>Each player with any cards in hand passes one to the next such player to their left, at once. Then you may trash a card from your hand</span>
    </div>
  );
  static types = ['Action'];
}
