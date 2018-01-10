import Card from 'cards/Card';

export default class BridgeTroll extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set('Action', 'Attack', 'Duration');
  // TODO
}
