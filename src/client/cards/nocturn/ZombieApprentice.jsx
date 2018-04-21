import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class ZombieApprentice extends Card {
  static title = 'Zombie Apprentice'
  static description = (
    <div>
      <div>You may trash an Action card from your hand for <strong>+3 Cards</strong> and <strong>+1 Action.</strong></div>
    </div>
  );
  static cost = <Coin>3</Coin>
  static types = ['Action', 'Zombie'];
}

Card.classes.set('ZombieApprentice', ZombieApprentice);
