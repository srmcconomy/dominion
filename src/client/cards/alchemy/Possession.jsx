import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Debt from 'components/Debt';
import PotionImg from 'components/Potion';

export default class Possession extends Card {
  static description = (
    <div>
      <div>The player to your left takes an extra turn after this one, in which you can see all cards they can and make all decisions for them. Any cards or <Debt /> they would gain on that turn, you gain instead; any cards of theirs that are trashed are set aside and put in their discard pile at end of turn.</div>
    </div>
  );
  static cost = <div><Coin>3</Coin><PotionImg /></div>
  static types = ['Action'];
}

Card.classes.set('Possession', Possession);
