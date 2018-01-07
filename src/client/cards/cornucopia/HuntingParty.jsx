import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class HuntingParty extends Card {
  static title = 'Hunting Party';
  static description = (
    <div>
      <div><strong>+1 Card</strong></div>
      <div><strong>+1 Action</strong></div>
      <div>Reveal your hand. Reveal cards from your deck until you reveal a card that isn't a duplicate of one in your hand. Put it into your hand and discard the rest.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action'];
}

Card.classes.set('HuntingParty', HuntingParty);
