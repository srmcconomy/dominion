import Supply from 'supplies/Supply';
import SupplyFactory from 'supplies/SupplyFactory';
import Cards from 'cards/alchemy/';
import * as Supplies from './';
import VictorySupplyFactory from '../VictorySupplyFactory';

Object.keys(Cards).forEach(title => {
  let SupplyClass;
  if (Supplies[title]) {
    SupplyClass = Supplies[title];
  } else if (Cards[title].types.has('Victory')) {
    SupplyClass = VictorySupplyFactory(Cards[title]);
  } else {
    SupplyClass = SupplyFactory(Cards[title]);
  }
  Supply.classes.set(title, SupplyClass);
});
