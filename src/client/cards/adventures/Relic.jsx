import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Big from 'components/Big';

export default class Relic extends Card {
  static description = (
    <div>
      <div><Big><Coin>2</Coin></Big></div>
      <div>When you play this, each other player puts their –1 Card token on their deck.</div>
    </div>
  );
  static value = <Coin>2</Coin>
  static cost = <Coin>5</Coin>
  static types = ['Treasure', 'Attack'];
}
