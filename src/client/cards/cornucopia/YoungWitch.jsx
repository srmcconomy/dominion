import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class YoungWitch extends Card {
  static title = 'Young Witch'
  static description = (
    <div>
      <div><strong>+2 Cards</strong></div>
      <div>Discard 2 cards. Each other player may reveal a Bane card from his hand. If he doesn't, he gains a Curse.</div>
      <div>-----------------</div>
      <div>Setup: Add an extra Kingdom card pile costing <Coin>2</Coin> or <Coin>3</Coin> to the Supply. Cards from that pile are Bane cards.</div>
    </div>
  );
  static cost = <Coin>4</Coin>
  static types = ['Action', 'Attack'];
}

Card.classes.set('YoungWitch', YoungWitch);
