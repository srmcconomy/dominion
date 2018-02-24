import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Giant extends Card {
  static description = (
    <div>
      <div>Turn your Journey token over (it starts face up). Then if it's face down, +<Coin>1</Coin>. If it's face up, +<Coin>5</Coin>, and each other player reveals the top card of their deck, trashes it if it costs from <Coin>3</Coin> to <Coin>6</Coin>, and otherwise discards it and gains a Curse.</div>
    </div>
  );
  static cost = <Coin>5</Coin>
  static types = ['Action', 'Attack'];
}
