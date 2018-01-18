import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class DeathCart extends Card {
  static title = 'Death Cart';
  static description = (
    <div>
      <div>+<Coin>5</Coin></div>
      <div>You may trash an Action card from your hand. If you don't, trash this.</div>
      <div>-------------</div>
      <div>When you gain this, gain 2 Ruins.</div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Action', 'Looter'];
}

Card.classes.set('DeathCart', DeathCart);
