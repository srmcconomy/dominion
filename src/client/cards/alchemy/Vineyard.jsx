import React from 'react';
import Card from 'cards/Card';
import PotionImg from 'components/Potion';
import VP from 'components/VP';

export default class Vineyard extends Card {
  static description = (
    <div>
      <div>Worth 1 <VP /> per 3 Action cards you have (round down).</div>
    </div>
  );
  static cost = <PotionImg />
  static types = ['Victory'];
}

Card.classes.set('Vineyard', Vineyard);
