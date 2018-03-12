import Imp from 'cards/nocturn/Imp';
import SupplyFactory from '../SupplyFactory';

export default class ImpSupply extends SupplyFactory(Imp, () => (13)) { }
