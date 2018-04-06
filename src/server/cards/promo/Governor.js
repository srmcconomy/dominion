import Card from 'cards/Card';

export default class Governor extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action']);
  async onPlay(player) {
    player.actions++;

    const choice = await player.selectOption(['Draw cards', 'Gain treasures', 'Remodle'], 'Select one');
    switch (choice) {
      case 0:
        await player.draw(3);
        await player.forEachOtherPlayer(async other => {
          await other.draw(1);
        });
        break;
      case 1:
        await player.gain('Gold');
        await player.forEachOtherPlayer(async other => {
          await other.gain('Silver');
        });
        break;
      case 2:
        await this.remodel(player, 2);
        await player.forEachOtherPlayer(async other => {
          await this.remodel(other, 1);
        });
        break;
      default:
        break;
    }
  }

  async remodel(player, costMore) {
    const [card] = await player.selectCards({
      min: 1,
      max: 1,
      message: 'Choose a Card to Remodel'
    });
    if (card) {
      await player.trash(card);
      const [supply] = await player.selectSupplies({
        min: 1,
        max: 1,
        predicate: async s => (s.cards.length > 0 ? (
          player.cardCostsEqualTo(s.cards.last(), (await player.getCardCost(card)).add({ coin: costMore }))
        ) : false),
        message: 'Choose an card to gain'
      });
      if (supply) {
        await player.gain(supply.title);
      }
    }
    await player.forEachOtherPlayer(async other => {
      await other.draw(1);
    });
  }
}
