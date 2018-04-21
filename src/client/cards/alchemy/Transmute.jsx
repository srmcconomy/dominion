import React from 'react';
import Card from 'cards/Card';
import PotionImg from 'components/Potion';

export default class Transmute extends Card {
  static description = (
    <div>
      <div>Trash a card from your hand.</div>
      <div>If it is an…</div>
      <div>Action card, gain a Duchy</div>
      <div>Treasure card, gain a Transmute</div>
      <div>Victory card, gain a Gold</div>
    </div>
  );
  static cost = <PotionImg />
  static types = ['Action'];
}

Card.classes.set('Transmute', Transmute);
