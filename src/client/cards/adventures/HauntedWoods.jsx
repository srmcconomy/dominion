import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class HauntedWoods extends Card {
  static title = 'Haunted Woods'
  static description = (
    <div>
      <div>Until your next turn, when any other player buys a card, they put their hand onto their deck in any order. At the start of your next turn: <strong>+3 Cards</strong></div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action', 'Attack', 'Duration'];
}
