export default async function KnightAttack(player, event, card) {
  let trashedKnight = false;
  await player.forEachOtherPlayer(async other => {
    if (event.handledByPlayer.get(other)) {
      return;
    }
    const cards = await other.draw(2, false);
    player.game.log(`${other.name} reveals ${cards.map(c => c.title).join(', ')}`);
    if (cards.some(c => player.costsMoreThanEqualTo(c, { coin: 3 }) && player.costsLessThanEqualTo(c, { coin: 6 }))) {
      const [card] = await other.selectCards({
        min: 1,
        max: 1,
        pile: cards.filter(c => player.costsMoreThanEqualTo(c, { coin: 3 }) && player.costsLessThanEqualTo(c, { coin: 6 })),
        message: 'Select a card to trash'
      });
      if (card.types.has('Knight')) trashedKnight = true;
      if (card) await other.trash(card, cards);
    }
    while (cards.length) {
      await other.discard(cards.last(), cards);
    }
  });
  if (trashedKnight) await player.trash(card, player.playArea);
}
