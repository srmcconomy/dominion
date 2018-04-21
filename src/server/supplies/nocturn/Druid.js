import SupplyFactory from 'supplies/SupplyFactory';
import Druid from 'cards/nocturn/Druid';
import Pile from 'utils/Pile';

export default class DruidSupply extends SupplyFactory(Druid) {
  setup(game) {
    game.druidBoons = new Pile();
    for (let i = 0; i < 3; i++) {
      game.druidBoons.push(game.boonPile.last());
      game.boonPile.delete(game.boonPile.last());
    }
    game.log(`Druid Boons are: ${game.druidBoons.map(c => c.title).join(' ,')}`);
  }
}
