import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';
import VP from 'components/VP';

export default class DistantLands extends Card {
  static title = 'Distant Lands';
  static description = (
    <div>
      <div>Put this on your Tavern mat.</div>
      <Line />
      <div>Worth 4<VP /> if on your Tavern mat at the end of the game (otherwise worth 0<VP />).</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action', 'Reserver', 'Victory'];
}
