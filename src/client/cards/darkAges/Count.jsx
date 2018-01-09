import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Count extends Card {
  static description = (
    <div>
      <div>Choose one: Discard 2 cards; or put a card from your hand onto your deck; or gain a Copper.</div>
      <div>Choose one: +<Coin>3</Coin>; or trash your hand; or gain a Duchy.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action'];
}

Card.classes.set('Count', Count);
