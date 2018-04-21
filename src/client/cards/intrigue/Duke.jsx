import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import VP from 'components/VP';

export default class Duke extends Card {
  static description = (
    <div>
      Worth 1 <VP />  per Duchy you have.
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Victory'];
}

Card.classes.set('Duke', Duke);
