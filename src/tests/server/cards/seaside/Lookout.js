import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Lookout'];
  });

  test('should move cards correctly', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Lookout']);
    setDeck(player, ['Copper', 'Copper', 'Province', 'Duchy', 'Estate']);
    await waitForNextInput();
    respondWithCard('Lookout');
    await waitForNextInput();
    respondWithCard('Estate');
    await waitForNextInput();
    respondWithCard('Duchy');
    await waitForNextInput();
    respondWithCard('Province');
    await waitForNextInput();
    expect(game.trash.last().title).toBe('Estate');
    expect(player.discardPile.last().title).toBe('Duchy');
    expect(player.deck.last().title).toBe('Province');
    expect(player.actions).toBe(1);
  });

  test('should work with not enough cards in deck', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Lookout']);
    setDeck(player, ['Duchy', 'Estate']);
    await waitForNextInput();
    respondWithCard('Lookout');
    await waitForNextInput();
    respondWithCard('Estate');
    await waitForNextInput();
    respondWithCard('Duchy');
    await waitForNextInput();
    expect(game.trash.last().title).toBe('Estate');
    expect(player.discardPile.last().title).toBe('Duchy');
    expect(player.deck.length).toBe(0);
    expect(player.actions).toBe(1);
  });
};
