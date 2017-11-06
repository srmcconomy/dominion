import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Bureaucrat extends Card {
  static description = 'Gain a Silver onto your deck. Each other player reveals a Victory card from their hand and puts it onto their deck (or reveals a hand with no Victory cards).'
  static cost = <Coin>4</Coin>
  static types = ['Action', 'Attack'];
}

Card.classes.set('Bureaucrat', Bureaucrat);
