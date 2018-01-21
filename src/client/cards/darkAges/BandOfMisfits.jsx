import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class BandOfMisfits extends Card {
  static description = (
    <div>
      <div>Play this as if it were a cheaper Action card in the Supply. This is that card until it leaves play.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action'];
}

Card.classes.set('BandOfMisfits', BandOfMisfits);
