import Card from 'cards/Card';

export default class Jester extends Card {
  static cost = { coin: 5 };
  static types = new Set(['Action', 'Attack']);
  async onPlay(player) {
    player.money += 2;
    await player.forEachOtherPlayer(async other => {
      if (await other.handleOwnReactions('attack', player, this)) {
        return;
      }
      const [card] = other.lookAtTopOfDeck(1);
      if (card) {
        player.game.log(`${other.name} reveals ${card.title}`);
        await other.discard(card, other.deck);
        if (card.types.has('Victory')) {
          await other.gain('Curse');
        } else {
          const choice = await player.selectOption([`${other.name} gains ${card.title}`, `You gain ${card.title}`]);
          switch (choice) {
            case 0:
              other.gain(card.title);
              break;
            case 1:
              player.gain(card.title);
              break;
            default:
              break;
          }
        }
      }
    });
  }
}
