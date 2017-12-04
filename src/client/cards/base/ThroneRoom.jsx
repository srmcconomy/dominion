import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class ThroneRoom extends Card {
  static title = 'Throne Room'
  static description = (<div>You may play an Action card from your hand twice.</div>);
  static cost = <Coin>4</Coin>
  static types = ['Action'];
}

Card.classes.set('ThroneRoom', ThroneRoom);
