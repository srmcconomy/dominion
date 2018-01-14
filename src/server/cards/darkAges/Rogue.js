import Card from 'cards/Card';

export default class Rogue extends Card {
  static cost = { coin: 5 };
  static types = new Set(['Action']);
  async onPlay(player, event) {
    if (player.game.trash.size > 0 && player.game.trash.some(c => c.types.has('Action') && player.costsMoreThanEqualTo(c, { coin: 3 }) && player.costsLessThanEqualTo(c, { coin: 6 }))) {
      const [card] = await player.selectCards({
        min: 1,
        max: 1,
        pile: player.game.trash.filter(c => c.types.has('Action') && player.costsMoreThanEqualTo(c, { coin: 3 }) && player.costsLessThanEqualTo(c, { coin: 6 })),
        message: 'Choose an action to gain' });
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
        if (cards.some(c => player.costsMoreThanEqualTo(c, { coin: 3 }) && player.costsLessThanEqualTo(c, { coin: 6 }))) {
          const [card] = await other.selectCards({
            min: 1,
            max: 1,
            pile: cards.filter(c => player.costsMoreThanEqualTo(c, { coin: 3 }) && player.costsLessThanEqualTo(c, { coin: 6 })),
            message: 'Select a card to trash'
          });
          if (card) await other.trash(card, cards);
        }
        while (cards.length) {
          await player.discard(cards.last(), cards);
        }
      });
    }
  }
}
