import SupplyFactory from 'supplies/SupplyFactory';
import Necromancer from 'cards/nocturn/Necromancer';
import ZombieApprentice from 'cards/nocturn/ZombieApprentice';
import ZombieMason from 'cards/nocturn/ZombieMason';
import ZombieSpy from 'cards/nocturn/ZombieSpy';

export default class NecromancerSupply extends SupplyFactory(Necromancer) {
  setup(game) {
    game.trash.push(new ZombieApprentice(game));
    game.trash.push(new ZombieMason(game));
    game.trash.push(new ZombieSpy(game));
  }
}
