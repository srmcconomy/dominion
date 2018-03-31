import Port from 'cards/adventures/Port';
import SupplyFactory from '../SupplyFactory';

export default class PortSupply extends SupplyFactory(Port, () => (12)) { }
