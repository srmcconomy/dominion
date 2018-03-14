import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Leprechaun extends Card {
  static description = (
    <div>
      <div>Gain a Gold. If you have exactly 7 cards in play, gain a Wish from its pile. Otherwise, receive a Hex.</div>
    </div>
  );
  static cost = <Coin>3</Coin>
  static types = ['Action', 'Doom'];
}

Card.classes.set('Leprechaun', Leprechaun);
