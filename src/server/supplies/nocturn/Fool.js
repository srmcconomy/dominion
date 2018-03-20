import SupplyFactory from 'supplies/SupplyFactory';
import Fool from 'cards/nocturn/Fool';
import LuckyCoin from 'cards/nocturn/LuckyCoin';
import LostInTheWoods from 'cards/nocturn/LostInTheWoods';
import Pile from 'utils/Pile';

export default class DruidSupply extends SupplyFactory(Fool) {
  setup(game) {
    game.players.forEach(player => {
      player.deck.push(new LuckyCoin(game));
    });
    game.lostInTheWoods = { player: null, pile: new Pile() };
    game.lostInTheWoods.pile.push(new LostInTheWoods(game));
    game.players.forEach(p => {
      p.addPersistentEffect('start-of-turn', game.lostInTheWoods.pile.last());
    });
  }
}
