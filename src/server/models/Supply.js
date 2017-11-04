import DirtyModel, { trackDirty } from 'utils/DirtyModel';
import Pile from 'utils/Pile';
import Card from 'cards/Card';

@DirtyModel
export default class Supply {
  @trackDirty
  tokens = {};

  @trackDirty
  cards = new Pile();

  @trackDirty
  title;

  constructor(title, game) {
    this.title = title;
    const CardClass = Card.classes.get(title);
    this.cards.push(...Array(CardClass.getNumberInSupply(game)).fill().map(() => new CardClass(game)));
  }
}
