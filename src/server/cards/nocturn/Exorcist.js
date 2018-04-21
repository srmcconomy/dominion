import Card from 'cards/Card';

export default class Exorcist extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Night']);
  async onPlay(player) {
    const [card] = await player.selectCards({
      min: 1,
      max: 1,
      message: 'Select a card to trash for a spirit'
    });
    await player.trash(card);

    if (card) {
      const choices = [];
      if (player.game.supplies.get('WillOWisp').cards.length > 0) {
        if (await player.cardCostsGreaterThan(card, player.game.supplies.get('WillOWisp').cards.last())) choices.push('WillOWisp');
      }
      if (player.game.supplies.get('Imp').cards.length > 0) {
        if (await player.cardCostsGreaterThan(card, player.game.supplies.get('Imp').cards.last())) choices.push('Imp');
      }
      if (player.game.supplies.get('Ghost').cards.length > 0) {
        if (await player.cardCostsGreaterThan(card, player.game.supplies.get('Ghost').cards.last())) choices.push('Ghost');
      }
      if (choices.length > 0) {
        const choice = await player.selectOption(choices);
        await player.gain(choices[choice]);
      }
    }
  }
}
