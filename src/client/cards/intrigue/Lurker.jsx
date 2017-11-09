import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Lurker extends Card {
  static cost = <Coin>2</Coin>;
  static description = (
    <div>
      <p><strong>+1 Action</strong></p>
      <p>Choose one: Trash an Action from the Supply; or gain an Action card from the trash.</p>
    </div>
  );
  static types = ['Action'];
}
