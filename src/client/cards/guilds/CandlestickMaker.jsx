import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class CandlestickMaker extends Card {
  static title = 'Candlestick Maker'
  static description = (
    <div>
      <div><strong>+1 Action</strong></div>
      <div><strong>+1 Buy</strong></div>
      <div>Take a Coin token.</div>
    </div>
  );
  static cost = <Coin>2</Coin>
  static types = ['Action'];
}

Card.classes.set('CandlestickMaker', CandlestickMaker);
