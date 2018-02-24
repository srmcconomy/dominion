import Rats from 'cards/darkAges/Rats';
import SupplyFactory from '../SupplyFactory';

export default class RatsSupply extends SupplyFactory(Rats, () => (20)) { }
