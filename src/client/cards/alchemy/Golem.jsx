import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import PotionImg from 'components/Potion';

export default class Golem extends Card {
  static description = (
    <div>
      <div>Reveal cards from your deck until you reveal 2 Action cards other than Golems. Discard the other cards, then play the Action cards in either order.</div>
    </div>
  );
  static cost = <div><Coin>4</Coin><PotionImg /></div>
  static types = ['Action'];
}

Card.classes.set('Golem', Golem);
