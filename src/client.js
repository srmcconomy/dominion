import 'babel-polyfill';
import { Map, List } from 'immutable';
import Game from './game';
import Player from './player';
import EventQueue from './event-queue';
import { Copper, Silver, Gold, Curse, Estate, Duchy, Province } from './cards/basic';
import { Chapel, Witch } from './cards/base';

EventQueue.on('select-cards', (player, min, max, predicate) => {
  const cards = player.hand.filter(predicate);
  const sel = prompt(cards.reduce((reduction, card) => `${reduction}${card.name}(${card.id}) `, ''));
  if (cards.has(+sel)) {
    EventQueue.emit('cards-selected', [cards.get(+sel)]);
    return;
  }
  EventQueue.emit('cards-selected', []);
});

EventQueue.on('select-supplies', (player, min, max, predicate) => {
  const supplies = player.game.supplies.filter(predicate);
  const sel = prompt(supplies.reduce((reduction, supply, index) => `${reduction}${index} `, ''));
  if (supplies.has(sel)) {
    EventQueue.emit('supplies-selected', [sel]);
    return;
  }
  EventQueue.emit('supplies-selected', []);
});

const game = new Game(new List([new Player(), new Player()]),
  new Map({
    Copper: new List(Array(46).fill().map(() => new Copper())),
    Silver: new List(Array(40).fill().map(() => new Silver())),
    Gold: new List(Array(30).fill().map(() => new Gold())),
    Curse: new List(Array(10).fill().map(() => new Curse())),
    Estate: new List(Array(8).fill().map(() => new Estate())),
    Duchy: new List(Array(8).fill().map(() => new Duchy())),
    Province: new List(Array(8).fill().map(() => new Province())),

    Chapel: new List(Array(10).fill().map(() => new Chapel())),
    Witch: new List(Array(10).fill().map(() => new Witch())),
  }),
);

game.loop();
