import Card from 'cards/Card';

export default class Ratcatcher extends Card {
  static cost = new Card.Cost({ coin: 2 });
  static types = new Set(['Action', 'Reserve']);
  async onPlay(player) {
    await player.draw(1);
    player.actions++;
    player.moveCard(this, player.playArea, player.mats.tavern);
  }

  canTriggerOn(event, player) {
    return event.name === 'start-of-turn' && event.triggeringPlayer === player && player.mats.tavern.includes(this);
  }

  async onTrigger(event, player) {
    const [card] = await player.selectCards({
      min: 1,
      max: 1,
      message: 'Choose a card to trash',
    });
    if (card) {
      await player.trash(card);
    }
    player.moveCard(this, player.mats.tavern, player.playArea);
  }
}
