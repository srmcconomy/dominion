import Card from 'cards/Card';

export default class YoungWitch extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action', 'Attack']);
  async onPlay(player, event) {
    await player.draw(2);
    const cards = await player.selectCards({ min: 2, max: 2, message: 'Discard two cards' });
    for (let i = 0; i < cards.length; i++) {
      await player.discard(cards[i]);
    }
    await player.forEachOtherPlayer(async other => {
      if (event.handledByPlayer.get(other)) {
        return;
      }
      const [card] = await other.selectCards({ min: 0, max: 1, predicate: c => c.title === YoungWitch.bane.title, message: 'Choose to reveal a bane card or not' });
      if (!card) {
        await other.gain('Curse');
      } else player.game.log(`${other.name} reveals ${card.title} as Young Witch's bane`);
    });
  }
}
