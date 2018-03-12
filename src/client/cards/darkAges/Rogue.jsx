import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Rogue extends Card {
  static description = (
    <div>
      <div>+<Coin>2</Coin></div>
      <div>If there are any cards in the trash costing from <Coin>3</Coin> to <Coin>6</Coin>, gain one of them. Otherwise, each other player reveals the top 2 cards of their deck, trashes one of them costing from <Coin>3</Coin> to  <Coin>6</Coin>, and discards the rest.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action', 'Attack'];
}

Card.classes.set('Rogue', Rogue);
