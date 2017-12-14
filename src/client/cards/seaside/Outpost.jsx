import React from 'react';
import Card from 'cards/Card';
import Coin from 'components/Coin';

export default class Outpost extends Card {
  static description = (
    <div>If this is the first time you played an Outpost this turn, and the previous turn wasn't yours, then take an extra turn after this one, and you only draw 3 cards for your next hand.</div>
    );
  static cost = <Coin>5</Coin>
  static types = ['Action', 'Duration'];
}

Card.classes.set('Outpost', Outpost);
