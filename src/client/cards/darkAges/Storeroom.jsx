import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Storeroom extends Card {
  static description = (
    <div>
      <div><strong>+1 Buy</strong></div>
      <div>Discard any number of cards, then draw that many. Then discard any number of cards for +<Coin>1</Coin> each.</div>
    </div>
  );
  static cost = <Coin>3</Coin>
  static types = ['Action'];
}

Card.classes.set('Storeroom', Storeroom);
