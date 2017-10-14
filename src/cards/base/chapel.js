import Card from '../card';
import { Set } from 'immutable';

export default class Chapel extends Card {
  static name = 'Chapel';
  static cost = 2;
  static types = new Set(['Action']);
  async onPlay(game) {
    const cards = await game.currentPlayer.selectCards(4, 'Select cards to trash');
    cards.forEach(game.currentPlayer.Trash);
  }
}

Card.classes.Chapel = Chapel;
