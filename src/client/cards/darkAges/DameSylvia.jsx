import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class DameSylvia extends Card {
  static title = 'Dame Sylvia';
  static description = (
    <div>
      <div>+<Coin>2</Coin></div>
      <div>Each other player reveals the top 2 cards of their deck, trashes one of them costing from <Coin>3</Coin> to <Coin>6</Coin>, and discards the rest. If a Knight is trashed by this, trash this.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action', 'Attack', 'Knight'];
}

Card.classes.set('DameSylvia', DameSylvia);
