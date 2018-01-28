import Card from 'cards/Card';

export default class Tournament extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action']);
  async onPlay(player) {
    player.actions++;
    const promises = player.game.playerOrder.map(other =>
      other.selectCards({
        min: 0,
        max: 1,
        predicate: c => c.title === 'Province',
        message: 'You may reveal a Province'
      })
    );
    const cards = (await Promise.all(promises)).map(a => a[0]);
    let weShowed = false;
    let otherShowed = false;
    for (let i = 0; i < cards.length; i++) {
      if (cards[i]) {
        player.game.log(`${player.game.playerOrder[i].name} shows a Province`);
        if (i === player.game.currentPlayerIndex) {
          weShowed = true;
        } else {
          otherShowed = true;
        }
      }
    }
    if (weShowed) {
      player.discard(cards[player.game.currentPlayerIndex]);
      const choice = await player.selectOption(['Gain a Prize', 'Gain a Duchy']);
      switch (choice) {
        case 0:
          {
            const [card] = await player.selectCards({
              min: 1,
              max: 1,
              pile: player.game.supplies.get('Prizes').cards,
              message: 'Choose your Prize'
            });
            if (card) await player.gainSpecificCard(card, player.game.supplies.get('Prizes').cards);
          }
          break;
        case 1:
          await player.gain('Duchy');
          break;
        default:
          break;
      }
    }
    if (!otherShowed) {
      await player.draw(1);
      player.money++;
    }
  }
}
