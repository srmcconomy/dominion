import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Cutpurse extends Card {
  static description = (
    <div>
      <div>+<Coin>2</Coin></div>
      <div>Each other player discards a Copper (or reveals a hand with no Copper).</div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Action', 'Attack'];
}

Card.classes.set('Cutpurse', Cutpurse);
