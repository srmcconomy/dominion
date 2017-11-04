import DirtyModel from 'models/DirtyModel';
import Pile from 'utils/Pile';
import Card from 'cards/Card';

export default class Supply extends DirtyModel {
  tokens = {};
  cards = new Pile();
  constructor(title, game) {
    super();
    this.title = title;
    const CardClass = Card.classes.get(title);
    this.cards.push(...Array(CardClass.getNumberInSupply(game)).fill().map(() => new CardClass(game)));
  }
}
