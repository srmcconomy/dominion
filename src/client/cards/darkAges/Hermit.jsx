import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';

export default class Hermit extends Card {
  static description = (
    <div>
      <div>Look through your discard pile. You may trash a non-Treasure card from your discard pile or hand. Gain a card costing up to <Coin>3</Coin>.</div>
      <Line />
      <div>When you discard this from play, if you didn't buy any cards this turn, trash this and gain a Madman from the Madman pile.</div>
    </div>
  );
  static cost = <Coin>3</Coin>
  static types = ['Action'];
}

Card.classes.set('Hermit', Hermit);
