import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Lurker extends Card {
  static cost = <Coin>2</Coin>;
  static description = (
    <div>
      <span>+1 Action</span>
      <span>Choose one: Trash an Action from the Supply; or gain an Action card from the trash.</span>
    </div>
  );
  static types = ['Action'];
}
