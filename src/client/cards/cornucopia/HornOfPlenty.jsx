import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class HornOfPlenty extends Card {
  static title = 'Horn Of Plenty';
  static description = (
    <div>
      <div><Coin>0</Coin></div>
      <div>When you play this, gain a card costing up to <Coin>1</Coin> per differently named card you have in play, counting this. If it's a Victory card, trash this.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static value = <Coin>0</Coin>;
  static types = ['Treasure'];
}

Card.classes.set('HornOfPlenty', HornOfPlenty);
