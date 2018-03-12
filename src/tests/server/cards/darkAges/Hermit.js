import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, setDiscardPile, respondWithCard, respondWithCards, respondWithSupply, skipToNextTurn, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Hermit'];
  });

  test('should gain', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Estate', 'Hermit']);
    await waitForNextInput();
    respondWithCard('Hermit');
    await waitForNextInput();
    respondWithCard('Estate');
    await waitForNextInput();
    respondWithSupply('Silver');
    await waitForNextInput();
    expect(player.hand.length).toBe(3);
    expect(game.trash.last().title).toBe('Estate');
    expect(player.discardPile.last().title).toBe('Silver');
  });

  test('should be able to trash from discard pile', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Hermit']);
    setDiscardPile(player, ['Duchy']);
    await waitForNextInput();
    respondWithCard('Hermit');
    await waitForNextInput();
    respondWithCard('Duchy');
    await waitForNextInput();
    respondWithSupply('Silver');
    await waitForNextInput();
    expect(player.discardPile.some(c => c.title === 'Duchy')).toBe(false);
    expect(game.trash.last().title).toBe('Duchy');
  });

  test('should Gain a Madman on Discard', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Hermit']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    await waitForNextInput();
    respondWithCard('Hermit');
    await waitForNextInput();
    respondWithSupply('Silver');
    await skipToNextTurn(otherPlayer);
    expect(player.discardPile.some(c => c.title === 'Madman')).toBe(true);
    expect(player.discardPile.some(c => c.title === 'Hermit')).toBe(false);
    expect(game.trash.last().title).toBe('Hermit');
    expect(game.supplies.get('Madman').cards.length).toBe(9);
  });

  test('shouldn\'t Gain a Madman if card purchased', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Hermit']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    await waitForNextInput();
    respondWithCard('Hermit');
    await waitForNextInput();
    respondWithSupply('Silver');
    await waitForNextInput();
    respondWithSupply('Curse');
    await skipToNextTurn(otherPlayer);
    expect(player.discardPile.some(c => c.title === 'Madman')).toBe(false);
    expect(player.discardPile.some(c => c.title === 'Hermit')).toBe(true);
    expect(player.discardPile.some(c => c.title === 'Curse')).toBe(true);
    expect(game.trash.length).toBe(0);
    expect(game.supplies.get('Madman').cards.length).toBe(10);
  });

  test('shouldn\'t Gain a Madman if discarded other ways', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Cellar', 'Hermit']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Copper', 'Copper']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    await waitForNextInput();
    respondWithCard('Cellar');
    await waitForNextInput();
    respondWithCards(['Hermit']);
    await skipToNextTurn(otherPlayer);
    expect(player.discardPile.some(c => c.title === 'Madman')).toBe(false);
    expect(player.discardPile.some(c => c.title === 'Hermit')).toBe(true);
    expect(game.trash.length).toBe(0);
    expect(game.supplies.get('Madman').cards.length).toBe(10);
  });

  test('should create Madman Supply', async () => {
    await startGameGetPlayerAndWaitForStartOfTurn(game);
    expect(game.supplies.get('Madman').cards.length).toBe(10);
  });
};
