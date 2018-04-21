import Spoils from 'cards/darkAges/Spoils';
import SupplyFactory from '../SupplyFactory';

export default class SpoilsSupply extends SupplyFactory(Spoils, () => (15)) { }
