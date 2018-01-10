import SupplyFactory from 'supplies/SupplyFactory';
import NativeVillage from 'cards/seaside/NativeVillage';
import Pile from 'utils/Pile';

export default class NativeVillageSupply extends SupplyFactory(NativeVillage) {
  setup(game) {
    game.players.forEach(player => {
      player.mats.nativeVillage = new Pile();
    });
  }
}
