import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithCards, respondWithSupply, respondWithNoCards, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Altar'];
  });

  test('Hovel should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Hovel']);
    const card = player.hand.last();
    expect(card.types).toHave('Reaction');
    expect(card.types).toHave('Shelter');
    expect(card.types.size).toBe(2);
    expect(card.cost.coin).toBe(1);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('Necropolis should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Necropolis']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types).toHave('Shelter');
    expect(card.types.size).toBe(2);
    expect(card.cost.coin).toBe(1);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('OvergrownEstate should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['OvergrownEstate']);
    const card = player.hand.last();
    expect(card.types).toHave('Victory');
    expect(card.types).toHave('Shelter');
    expect(card.types.size).toBe(2);
    expect(card.cost.coin).toBe(1);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should add shelters to starting deck with all darkAges cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    await waitForNextInput();
    expect(player.hand.some(c => c.title === 'Hovel') || player.deck.some(c => c.title === 'Hovel')).toBe(true);
    expect(player.hand.some(c => c.title === 'Necropolis') || player.deck.some(c => c.title === 'Necropolis')).toBe(true);
    expect(player.hand.some(c => c.title === 'OvergrownEstate') || player.deck.some(c => c.title === 'OvergrownEstate')).toBe(true);
  });

  test('Hovel should trash', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Silver', 'Hovel']);
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    respondWithSupply('Estate');
    await waitForNextInput();
    respondWithCard('Hovel');
    await waitForNextInput();
    expect(game.trash.last().title).toBe('Hovel');
    expect(player.discardPile.length).toBe(2);
  });

  test('Hovel should be optional', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Silver', 'Hovel']);
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    respondWithSupply('Estate');
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    expect(game.trash.length).toBe(0);
    expect(player.discardPile.length).toBe(3);
  });

  test('Necropolis should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Necropolis']);
    await waitForNextInput();
    respondWithCard('Necropolis');
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.actions).toBe(2);
  });

  test('OvergrownEstate should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Chapel', 'OvergrownEstate']);
    await waitForNextInput();
    respondWithCard('Chapel');
    await waitForNextInput();
    respondWithCards(['OvergrownEstate']);
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
  });

  test('OvergrownEstate should be worth 0', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'OvergrownEstate']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    game.endOfGame();
    expect(player.score).toBe(0);
  });
};
