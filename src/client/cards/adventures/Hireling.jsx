import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Hireling extends Card {
  static description = (
    <div>
      <div>At the start of each of your turns for the rest of the game: <strong>+1 Card</strong></div>
      <div><em>(This stays in play.)</em></div>
    </div>
  );
  static cost = <Coin>6</Coin>
  static types = ['Action', 'Duration'];
}
