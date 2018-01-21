import ReserveSupplyFactory from 'supplies/ReserveSupplyFactory';

export default function ReserveVictorySupplyFactory(CardClass) {
  return ReserveSupplyFactory(CardClass, game => (game.players.size === 2 ? 8 : 12));
}
