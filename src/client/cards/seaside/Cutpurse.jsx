import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Cutpurse extends Card {
  static description = <div>
  <p>+<Coin>2</Coin></p>
  <p>Each other player discards a Copper (or reveals a hand with no Copper).</p>
  </div>
  static cost = <Coin>3</Coin>
  static types = ['Action', 'Attack'];
}

Card.classes.set('Cutpurse', Cutpurse);