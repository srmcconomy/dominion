import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class FortuneTeller extends Card {
  static title = 'Fortune Teller';
  static description = (
    <div>
      <div>+<Coin>2</Coin></div>
      <div>Each other player reveals cards from the top of his deck until he reveals a Victory or Curse card. He puts it on top and discards the other revealed cards.</div>
    </div>
  );
  static cost = <Coin>3</Coin>
  static types = ['Action', 'Attack'];
}

Card.classes.set('FortuneTeller', FortuneTeller);
