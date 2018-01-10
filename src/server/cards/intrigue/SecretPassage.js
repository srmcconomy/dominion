import Card from 'cards/Card';

export default class SecretPassage extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(2);
    player.actions++;
    const [card] = await player.selectCards({
      min: 1,
      max: 1,
      message: 'Choose a card to place in your deck'
    });
    const res = await player.selectOptionOrCardsOrSupplies(
      ['Top of Deck'],
      {
        min: 1,
        max: 1,
        pile: player.deck,
      },
      null,
      'Choose which card in your deck the selected card will be placed below. To the right is top of deck',
    );
    if (res === 0) {
      player.hand.delete(card);
      player.deck.push(card);
    } else {
      const [pos] = res;
      player.hand.delete(card);
      player.deck.splice(player.deck.map.get(pos.id), 0, card);
    }

  }
}
