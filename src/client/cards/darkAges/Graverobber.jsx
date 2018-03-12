import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Graverobber extends Card {
  static description = (
    <div>
      <div>Choose one: Gain a card from the trash costing from <Coin>3</Coin> to <Coin>6</Coin>, onto your deck; or trash an Action card from your hand and gain a card costing up to <Coin>3</Coin> more than it.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action'];
}

Card.classes.set('Graverobber', Graverobber);
