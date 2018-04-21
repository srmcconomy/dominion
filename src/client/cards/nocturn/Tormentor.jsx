import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Tormentor extends Card {
  static description = (
    <div>
      <div>+<Coin>1</Coin></div>
      <div>If you have no other cards in play, gain an Imp from its pile. Otherwise, each other player receives the next Hex.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action', 'Attack', 'Doom'];
}

Card.classes.set('Tormentor', Tormentor);
