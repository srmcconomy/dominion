import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class DameJosephine extends Card {
  static title = 'Dame Josephine';
  static description = (
    <div>
      <div>Each other player reveals the top 2 cards of their deck, trashes one of them costing from <Coin>3</Coin> to <Coin>6</Coin>, and discards the rest. If a Knight is trashed by this, trash this.</div>
      <div>LINE!!</div>
      <div>2VP</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action', 'Attack', 'Knight', 'Victory'];
}

Card.classes.set('DameJosephine', DameJosephine);
