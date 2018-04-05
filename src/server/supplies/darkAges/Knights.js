import DameAnna from 'cards/darkAges/DameAnna';
import DameJosephine from 'cards/darkAges/DameJosephine';
import DameMolly from 'cards/darkAges/DameMolly';
import DameNatalie from 'cards/darkAges/DameNatalie';
import DameSylvia from 'cards/darkAges/DameSylvia';
import SirBailey from 'cards/darkAges/SirBailey';
import SirDestry from 'cards/darkAges/SirDestry';
import SirMartin from 'cards/darkAges/SirMartin';
import SirMichael from 'cards/darkAges/SirMichael';
import SirVander from 'cards/darkAges/SirVander';
import Card from 'cards/Card';
import Supply from '../Supply';

export default class Knights extends Supply {
    static types = new Set(['Action', 'Attack', 'Knight']);
    static cost = new Card.Cost({ coin: 5 });
    static title = 'Knights';
    static category = 'kingdom';

    constructor(game) {
      super();
      this.cards.push(new DameAnna(game));
      this.cards.push(new DameJosephine(game));
      this.cards.push(new DameMolly(game));
      this.cards.push(new DameNatalie(game));
      this.cards.push(new DameSylvia(game));
      this.cards.push(new SirBailey(game));
      this.cards.push(new SirDestry(game));
      this.cards.push(new SirMartin(game));
      this.cards.push(new SirMichael(game));
      this.cards.push(new SirVander(game));
      this.cards.shuffle();
      // this.selectorCard.push(new (Card.classes.get('Knights'))(game));
    }
}
