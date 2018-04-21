import AbandonedMine from 'cards/darkAges/AbandonedMine';
import RuinedLibrary from 'cards/darkAges/RuinedLibrary';
import RuinedMarket from 'cards/darkAges/RuinedMarket';
import RuinedVillage from 'cards/darkAges/RuinedVillage';
import Survivors from 'cards/darkAges/Survivors';
import Card from 'cards/Card';
import Supply from '../Supply';

export default class Ruins extends Supply {
    static category = 'treasure2';
    static types = new Set(['Action', 'Ruins']);
    static cost = new Card.Cost({ coin: 0 });
    static title = 'Ruins';

    constructor(game) {
      super();
      this.cards.push(
        ...Array(10).fill().map(() => new AbandonedMine(game)),
        ...Array(10).fill().map(() => new RuinedLibrary(game)),
        ...Array(10).fill().map(() => new RuinedMarket(game)),
        ...Array(10).fill().map(() => new RuinedVillage(game)),
        ...Array(10).fill().map(() => new Survivors(game)),
      );
      this.cards.shuffle();
      this.cards = this.cards.splice(0, (10 * game.players.size) - 10);
      // this.selectorCard.push(new (Card.classes.get('Ruins'))(game));
    }
}
