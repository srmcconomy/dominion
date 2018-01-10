import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';

export default class CoinOfTheRealm extends Card {
  static title = 'Coin of the Realm';
  static description = (
    <div>
      <div><Coin>1</Coin></div>
      <div>When you play this, put it on your Tavern mat.</div>
      <Line />
      <div>Directly after you finish playing an Action card, you may call this, for <strong>+2 Actions</strong></div>
    </div>
  );
  static cost = <Coin>2</Coin>
  static value = <Coin>1</Coin>
  static types = ['Treasure', 'Reserve'];
}
