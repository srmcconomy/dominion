import Card from 'cards/Card';

export default class Minion extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action', 'Attack']);
  async onPlay(player, event) {
    player.actions++;
    const choices = {
      '+2 coins': () => { player.money += 2; },
      'Discard your hand, +4 cards, attack': async () => {
        await player.discardAll([...player.hand]);
        await player.draw(4);
        await player.forEachOtherPlayer(async other => {
          if (event.handledByPlayer.get(other)) {
            return;
          }
          if (other.hand.size >= 5) {
            await other.discardAll([...other.hand], other.hand);
            await other.draw(4);
          }
        });
      }
    };
    const keys = Object.keys(choices);
    const choice = await player.selectOption(keys, 'Choose one');
    await choices[keys[choice]]();
  }
}
