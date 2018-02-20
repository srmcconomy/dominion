import Card from 'cards/Card';

export default class Count extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action']);
  async onPlay(player) {
    const choice1 = await player.selectOption(['Discard 2 cards', 'Put a card from your hand onto your deck', 'Gain a Copper']);
    switch (choice1) {
      case 0:
        {
          const cards = await player.selectCards({
            min: 2,
            max: 2,
            message: 'Choose 2 cards to discard'
          });
          for (let i = 0; i < cards.length; i++) {
            await player.discard(cards[i]);
          }
        }
        break;
      case 1:
        {
          const [card] = await player.selectCards({
            min: 1,
            max: 1,
            message: 'Choose a Card to top deck'
          });
          if (card) await player.topDeck(card);
        }
        break;
      case 2:
        await player.gain('Copper');
        break;
      default:
        break;
    }


    const choice2 = await player.selectOption(['+3 Coin', 'Trash your hand', 'Gain a Duchy']);
    switch (choice2) {
      case 0:
        player.money += 3;
        break;
      case 1:
        await player.trashAll([...player.hand]);
        break;
      case 2:
        await player.gain('Duchy');
        break;
      default:
        break;
    }
  }
}
