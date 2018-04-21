export default async function KnightAttack(player, event, knight) {
  let trashedKnight = false;
  await player.forEachOtherPlayer(async other => {
    if (event.handledByPlayer.get(other)) {
      return;
    }
    const cards = await other.draw(2, false);
    player.game.log(`${other.name} reveals ${cards.map(c => c.name).join(', ')}`);
    if (cards.some(async c => await player.cardCostsGreaterThanEqualTo(c, { coin: 3 }) && player.cardCostsLessThanEqualTo(c, { coin: 6 }))) {
      const [card] = await other.selectCards({
        min: 1,
        max: 1,
        pile: cards.filter(c => player.cardCostsGreaterThanEqualTo(c, { coin: 3 }) && player.cardCostsLessThanEqualTo(c, { coin: 6 })),
        message: 'Select a card to trash'
      });
      if (card.types.has('Knight')) trashedKnight = true;
      if (cards.includes(card)) await other.trash(card, cards);
    }
    await other.discardAll([...cards], other.hand);
  });
  if (trashedKnight && player.playArea.includes(knight)) await player.trash(knight, player.playArea);
}
