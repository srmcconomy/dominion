import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class ThroneRoom extends Card {
  static description = 'You may play an Action card from your hand twice.'
  static cost = <Coin>4</Coin>
  static types = ['Action'];
}

Card.classes.set('ThroneRoom', ThroneRoom);
