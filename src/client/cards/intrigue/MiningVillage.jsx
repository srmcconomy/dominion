import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class MiningVillage extends Card {
  static title = 'Mining Village';
  static cost = <Coin>4</Coin>;
  static description = (
    <div>
      <div><strong>+1 Card</strong></div>
      <div><strong>+2 Action</strong></div>
      <div>You may trash this for +<Coin>2</Coin></div>
    </div>
  );
  static types = ['Action'];
}
