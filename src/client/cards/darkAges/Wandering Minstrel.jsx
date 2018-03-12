import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class WanderingMinstrel extends Card {
  static title = 'Wandering Minstrel'
  static description = (
    <div>
      <div><strong>+1 Card</strong></div>
      <div><strong>+2 Actions</strong></div>
      <div>Reveal the top 3 cards of your deck. Put the Action cards back in any order and discard the rest.</div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Action'];
}

Card.classes.set('WanderingMinstrel', WanderingMinstrel);
