import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithCards, skipToNextTurn, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Fool'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Fool']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types).toHave('Fate');
    expect(card.types.size).toBe(2);
    expect(card.cost.coin).toBe(3);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('LuckyCoin should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['LuckyCoin']);
    const card = player.hand.last();
    expect(card.types).toHave('Treasure');
    expect(card.types).toHave('Heirloom');
    expect(card.types.size).toBe(2);
    expect(card.cost.coin).toBe(4);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should add Lucky Coin to starting deck', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    await waitForNextInput();
    expect(game.supplies.get('Copper').cards.length).toBe(48);
    expect(player.hand.filter(c => c.title === 'LuckyCoin').length + player.deck.filter(c => c.title === 'LuckyCoin').length).toBe(1);
    expect(player.hand.filter(c => c.title === 'Copper').length + player.deck.filter(c => c.title === 'Copper').length).toBe(6);
    expect(player.hand.filter(c => c.title === 'Estate').length + player.deck.filter(c => c.title === 'Estate').length).toBe(3);
  });

  test('should take lost in the woods and boons', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Fool']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    await waitForNextInput();
    respondWithCard('Fool');
    await waitForNextInput();

    await skipToNextTurn(otherPlayer);
    await waitForNextInput();
    expect(player.boonsReceivedThisTurn.length).toBe(3);
    expect(game.lostInTheWoods.player).toBe(player);

    await skipToNextTurn(player);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithCard('LostInTheWoods');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    expect(player.boonsReceivedThisTurn.length).toBe(1);
    // expect(player.hand.length).toBe(4);
    // expect(player.discardPile.last().title).toBe('Copper'); Can't test this since it can proc a reshuffle and discard will be empty, boons too random
  });

  test('Lucky Coin should give money and Silver', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'LuckyCoin']);
    await waitForNextInput();
    respondWithCard('LuckyCoin');
    await waitForNextInput();
    expect(player.money).toBe(1);
    expect(player.discardPile.last().title).toBe('Silver');
  });

  test('Should receive boons in desired order');
};
