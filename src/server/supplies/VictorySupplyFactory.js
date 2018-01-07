import SupplyFactory from 'supplies/SupplyFactory';

export default function VictorySupplyFactory(CardClass) {
  return SupplyFactory(CardClass, game => (game.players.size === 2 ? 8 : 12));
}
