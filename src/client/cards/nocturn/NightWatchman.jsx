import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';

export default class NightWatchman extends Card {
  static title = 'Night Watchman';
  static description = (
    <div>
      <div>Look at the top 5 cards of your deck, discard any number, and put the rest back in any order.</div>
      <Line />
      <div>This is gained to your hand (instead of your discard pile).</div>
    </div>
  );
  static cost = <Coin>3</Coin>
  static types = ['Night'];
}

Card.classes.set('NightWatchman', NightWatchman);
