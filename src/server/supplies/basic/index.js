import Supply from 'supplies/Supply';
import SupplyFactory from 'supplies/SupplyFactory';

import Copper from 'cards/basic/Copper';
import Silver from 'cards/basic/Silver';
import Gold from 'cards/basic/Gold';
import Platinum from 'cards/basic/Platinum';

import Potion from 'cards/basic/Potion';

import Estate from 'cards/basic/Estate';
import Duchy from 'cards/basic/Duchy';
import Province from 'cards/basic/Province';
import Colony from 'cards/basic/Colony';

import Curse from 'cards/basic/Curse';

Supply.classes.set('Copper', SupplyFactory(Copper, game => 60 - (7 * game.players.size), 'treasure'));
Supply.classes.set('Silver', SupplyFactory(Silver, () => 40, 'treasure'));
Supply.classes.set('Gold', SupplyFactory(Gold, () => 30, 'treasure'));
Supply.classes.set('Platinum', SupplyFactory(Platinum, () => 12, 'treasure'));

Supply.classes.set('Potion', SupplyFactory(Potion, () => 16, 'treasure'));

Supply.classes.set('Estate', SupplyFactory(Estate, game => (game.players.size === 2 ? 8 : 12), 'victory'));
Supply.classes.set('Duchy', SupplyFactory(Duchy, game => (game.players.size === 2 ? 8 : 12), 'victory'));
Supply.classes.set('Province', SupplyFactory(Province, game => {
  if (game.players.size === 2) return 8;
  if (game.players.size <= 4) return 12;
  return game.players.size * 3;
}, 'victory'));
Supply.classes.set('Colony', SupplyFactory(Colony, game => (game.players.size === 2 ? 8 : 12), 'victory'));

Supply.classes.set('Curse', SupplyFactory(Curse, game => (game.players.size - 1) * 10, 'treasure'));
