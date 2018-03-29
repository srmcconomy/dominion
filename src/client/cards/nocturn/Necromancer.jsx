import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Line from 'components/Line';

export default class Necromancer extends Card {
  static description = (
    <div>
      <div>Play a face up, non-Duration Action card from the trash, leaving it there and turning it face down for the turn.</div>
      <Line />
      <div>Setup: Put the 3 Zombies into the trash</div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Action'];
}

Card.classes.set('Necromancer', Necromancer);
