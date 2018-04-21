import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import PotionImg from 'components/Potion';

export default class University extends Card {
  static description = (
    <div>
      <div><strong>+2 Actions</strong></div>
      <div>You may gain an Action card costing up to <Coin>5</Coin>.</div>
    </div>
  );
  static cost = <div><Coin>2</Coin><PotionImg /></div>
  static types = ['Action'];
}

Card.classes.set('University', University);
