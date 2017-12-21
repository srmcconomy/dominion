import Card from 'cards/Card';

export default class TrustySteed extends Card {
  static cost = { coin: 0 };
  static types = new Set(['Action']);
  static supplyCategory = 'nonSupply';
  async onPlay(player) {
    const options = ['+2 Cards', '+2 Actions', '+2 Coin', 'Gain 4 Silvers, put deck in discard pile'];
    const choices = [null, null];
    choices[0] = await player.selectOption(options);
    player.game.log(`${player.name} chooses ${options[choices[0]]}`);
    options.splice(choices[0], 1);
    choices[1] = await player.selectOption(options);
    if (choices[1] >= choices[0]) choices[1]++;
    player.game.log(`${player.name} chooses ${options[choices[1]]}`);
    if (choices.includes(0)) {
      await player.draw(2);
    }
    if (choices.includes(1)) {
      player.actions += 2;
    }
    if (choices.includes(2)) {
      player.money += 2;
    }
    if (choices.includes(3)) {
      for (let i = 0; i < 4; i++) {
        await player.gain('Silver');
      }
      player.moveCard(player.deck, player.discardPile, { num: player.deck.size });
    }
  }
}
