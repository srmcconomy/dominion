import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Misery extends Card {
  static description = (
    <div>
      <div>If this is your first Misery this game, take Miserable. Otherwise, flip it over to Twice Miserable.</div>
    </div>
  );
  static cost = <Coin>0</Coin>
  static types = ['Hex'];
}

Card.classes.set('Misery', Misery);
