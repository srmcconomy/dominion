import Wish from 'cards/nocturn/Wish';
import SupplyFactory from '../SupplyFactory';

export default class WishSupply extends SupplyFactory(Wish, () => (12)) { }
