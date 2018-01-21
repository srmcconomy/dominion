import SupplyFactory from 'supplies/SupplyFactory';
import Pile from 'utils/Pile';

export default function ReserveSupplyFactory(...args) {
  return class extends SupplyFactory(...args) {
    setup(game) {
      game.players.forEach(player => {
        if (!player.mats.tavern) {
          player.mats.tavern = new Pile();
        }
      });
    }
  };
}
