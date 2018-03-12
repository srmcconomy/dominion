import Ghost from 'cards/nocturn/Ghost';
import SupplyFactory from '../SupplyFactory';

export default class GhostSupply extends SupplyFactory(Ghost, () => (6)) { }
