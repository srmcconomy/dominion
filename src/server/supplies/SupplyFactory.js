import Supply from 'supplies/Supply';

export default function SupplyFactory(CardClass, getNumCards = () => 10, category = 'kingdom') {
  return class extends Supply {
    static category = CardClass.supplyCategory ? CardClass.supplyCategory : category;
    static types = CardClass.types;
    static cost = CardClass.cost;
    static title = CardClass.title;

    constructor(game) {
      super();
      this.cards.push(...Array(getNumCards(game)).fill().map(() => new CardClass(game, this)));
    }
  };
}
