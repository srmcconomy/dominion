import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import VP from 'components/VP';
import Line from 'components/Line';
import Big from 'components/Big';

export default class Cemetery extends Card {
  static description = (
    <div>
      <Big><div><strong>2</strong> <VP /></div></Big>
      <Line />
      <div>When you gain this, trash up to 4 cards from your hand.</div>
      <div><em>Heirloom: Haunted Mirror</em></div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Victory'];
}

Card.classes.set('Cemetery', Cemetery);
