import Card from 'cards/Card';

export default class Rogue extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action']);
  async onPlay(player, event) {
    player.money += 2;
    if (player.game.trash.size > 0 && player.game.trash.some(async c => await player.cardCostsGreaterThanEqualTo(c, { coin: 3 }) && await player.cardCostsLessThanEqualTo(c, { coin: 6 }))) {
      const [card] = await player.selectCards({
        min: 1,
        max: 1,
        predicate: async c => await player.cardCostsGreaterThanEqualTo(c, { coin: 3 }) && await player.cardCostsLessThanEqualTo(c, { coin: 6 }),
        pile: player.game.trash,
        message: 'Choose a card to gain'
      });
      if (card) {
        await player.gainSpecificCard(card, player.game.trash);
      }
    } else {
      await player.forEachOtherPlayer(async other => {
        if (event.handledByPlayer.get(other)) {
          return;
        }
        const cards = await other.draw(2, false);
        player.game.log(`${other.name} reveals ${cards.map(c => c.title).join(', ')}`);
        if (cards.some(async c => await player.cardCostsGreaterThanEqualTo(c, { coin: 3 }) && await player.cardCostsLessThanEqualTo(c, { coin: 6 }))) {
          const [card] = await other.selectCards({
            min: 1,
            max: 1,
            predicate: async c => awaitplayer.cardCostsGreaterThanEqualTo(c, { coin: 3 }) && await player.cardCostsLessThanEqualTo(c, { coin: 6 }),
            pile: cards,
            message: 'Select a card to trash'
          });
          if (card) await other.trash(card, cards);
        }
        if (cards.length) await other.discardAll([...cards], cards);
      });
    }
  }
}
