import Bat from 'cards/nocturn/Bat';
import SupplyFactory from '../SupplyFactory';

export default class BatSupply extends SupplyFactory(Bat, () => (10)) { }
