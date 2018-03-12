import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import Medium from 'components/Medium';
import Line from 'components/Line';

export default class HauntedMirror extends Card {
  static title = 'Haunted Mirror'
  static description = (
    <div>
      <Medium><div><Coin>1</Coin></div></Medium>
      <Line />
      <div>When you trash this, you may discard an Action card, to gain a Ghost from its pile.</div>
    </div>
  );
  static cost = <Coin>0</Coin>
  static types = ['Treasure', 'Heirloom'];
}

Card.classes.set('HauntedMirror', HauntedMirror);
