import Card from 'cards/Card';

export default class Embargo extends Card {
  static cost = { coin: 2 };
  static types = new Set(['Action']);
  async onPlay(player) {
    player.money += 2;
    const [supply] = await player.selectSupplies({
      min: 1,
      max: 1,
      message: 'Choose a supply to embargo'
    });
    await player.trash(this, this.playArea);
    if (supply) {
      if (supply.tokens.embargo) {
        supply.tokens.embargo++;
      } else {
        supply.tokens.embargo = 1;
      }
    }
  }

  static setup(game) {
    const exampleCard = new Embargo(game);
    game.players.forEach(player => {
      player.addPersistentEffect('buy', exampleCard);
    });
  }

  willTriggerOn(event, player, persistent) {
    return persistent === 'persistent' && event.triggeringPlayer === player && player.game.supplies.get(event.card.title).tokens.embargo > 0;
  }

  async onTrigger(event, player) {
    for (let i = 0; i < player.game.supplies.get(event.card.title).tokens.embargo; i++) {
      await player.gain('Curse');
    }
  }
}
