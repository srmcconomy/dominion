import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';
import PotionImg from 'components/Potion';

export default class Apothecary extends Card {
  static description = (
    <div>
      <div><strong>+1 Card</strong></div>
      <div><strong>+1 Action</strong></div>
      <div>Reveal the top 4 cards of your deck. Put the Coppers and Potions into your hand. Put the rest back in any order.</div>
    </div>
  );
  static cost = <div><Coin>2</Coin><PotionImg /></div>
  static types = ['Action'];
}

Card.classes.set('Apothecary', Apothecary);
