import BagOfGold from 'cards/cornucopia/bagOfGold';
import Diadem from 'cards/cornucopia/diadem';
import Followers from 'cards/cornucopia/followers';
import Princess from 'cards/cornucopia/princess';
import TrustySteed from 'cards/cornucopia/trustySteed';
import Card from 'cards/Card';
import Supply from '../Supply';

export default class Prizes extends Supply {
    static category = 'nonSupply';
    static types = new Set(['Prize']);
    static cost = new Card.Cost({ coin: 0 });
    static title = 'Prizes';

    constructor(game) {
      super();
      this.cards.push(new BagOfGold(game));
      this.cards.push(new Diadem(game));
      this.cards.push(new Followers(game));
      this.cards.push(new Princess(game));
      this.cards.push(new TrustySteed(game));
    }
}
