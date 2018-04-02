import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import PotionImg from 'components/Potion';

export default class ScryingPool extends Card {
  static description = (
    <div>
      <div><strong>+1 Action</strong></div>
      <div>Each player (including you) reveals the top card of their deck and either discards it or puts it back, your choice. Then reveal cards from your deck until revealing one that isn’t an Action. Put all of those revealed cards into your hand.</div>
    </div>
  );
  static cost = <div><Coin>2</Coin><PotionImg /></div>
  static types = ['Action'];
}

Card.classes.set('ScryingPool', ScryingPool);
