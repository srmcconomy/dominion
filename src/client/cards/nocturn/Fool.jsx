import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Fool extends Card {
  static description = (
    <div>
      <div>If you aren't the player with Lost in the Woods, take it, take 3 Boons, and receive the Boons in any order.</div>
      <div><em>Heirloom: Lucky Coin</em></div>
    </div>
  );
  static cost = <Coin>3</Coin>
  static types = ['Action', 'Fate'];
}

Card.classes.set('Fool', Fool);
