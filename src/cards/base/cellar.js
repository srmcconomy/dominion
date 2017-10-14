import Card from '../card';
import { Set } from 'immutable';

export default class Cellar extends Card {
  static name = 'Cellar';
  static cost = 2;
  static types = new Set(['Action']);
  async onPlay(player) {
    player.actions++;
    const cards = await player.selectCards(0, -1);
    cards.forEach(card => player.discard(card));
    player.draw(cards.size);
  }
}

Card.classes.Cellar = Cellar;
