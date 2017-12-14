import Card from 'cards/Card';

export default class CardName extends Card {
  static title = 'Card Name';
  cost = 4;
  VP = 3;
  coin = 2;
  types = new Set(['Action', 'Treasure', 'Attack', 'Reaction', 'Victory']);
  async onPlay(player) {
    // Vanilla Effects
    player.draw(1);
    player.actions++;
    player.buys++;
    player.money++;

    // Trash card(s) in Hand, is it game.currentPlayer, or just Player?
    const cards = await game.currentPlayer.selectCards(min, max, predicate);
    cards.forEach(card => {
      player.trash(card);
    })

    // Trash this card
    player.trash(this);

    // Draw card and do something if()
    card = player.deck.last();
    if (card.types.has('Victory')) {  // look at top card in deck, discard if it is a victory card
      player.moveCard(this, player.deck, player.discard);
    }

    // Draw multiple cards and do something if(), basically emulating library
    const cards = player.setAside(min, max);
    cards.forEach(card => {
      if (card.types.has('Action')) {
        const choice = await player.chooseOption(['hand', 'discard']);
        if (choice === 'hard') {
          player.moveCard(card, player.setAside, player.hand);
        } else {
          player.moveCard(card, player.setAside, player.discard);
        }
      }
    });
    player.unsetAside();


    // Oponents draw card(s) and you do something , basically thief
    await game.forEachOtherPlayer(async otherPlayers => {
      const cards = otherPlayers.setAside(x,x);
      const card = await otherPlayers.selectCards(1, 1, card => card.types.has(['Treasure'], cards);
      otherPlayers.trash(card);
      otherPlayers.unsetAside();
    });

    // Other players discard X
    await game.forEachOtherPlayer(async otherPlayers => {
      if (otherPlayers.hand.size > 0) {
        const cards = await otherPlayers.selectCards(X, 'Select card(s) to discard');
        cards.forEach(card => otherPlayers.discard(card));
      }
    });

    // Other players discard down to X
    await game.forEachOtherPlayer(async otherPlayers => {
      if (otherPlayers.hand.size > X) {
        const cards = await otherPlayers.selectCards(player.hand.count - X, 'Select card(s) to discard');
        cards.forEach(card => otherPlayers.discard(card));
      }
    });

    // Gain a Card
    const supply = await player.chooseSupplyWhere(supply => (supply.last().cost <= 5 && supply.last().types.has('Treasure')));
    player.gain(supply.last());


  }
}
