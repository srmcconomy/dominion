import Supply from 'supplies/Supply';
import SupplyFactory from 'supplies/SupplyFactory';
import Cards from 'cards/adventures/';
import * as Supplies from './';
import VictorySupplyFactory from '../VictorySupplyFactory';

const travellers = new Set([
  'Champion',
  'Disciple',
  'Fugitive',
  'Hero',
  'Soldier',
  'Teacher',
  'TreasureHunter',
  'Warrior',
]);

Object.keys(Cards).forEach(title => {
  let SupplyClass;
  if (Supplies[title]) {
    SupplyClass = Supplies[title];
  } else if (travellers.has(title)) {
    SupplyClass = SupplyFactory(Cards[title], () => 5, 'nonSupply');
  } else if (Cards[title].types.has('Victory')) {
    SupplyClass = VictorySupplyFactory(Cards[title]);
  } else {
    SupplyClass = SupplyFactory(Cards[title]);
  }
  Supply.classes.set(title, SupplyClass);
});
