import { test, beforeEach, expect, log } from '../../testingFramework';
import { createGame, setHand, setStartingDeck, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput, respondWithCard, respondWithCards, respondWithChoice, skipToNextTurn, respondWith, respondWithFirstCard } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Guide'];
  });

  test('should give 1 card and 1 action', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Guide']);
    await waitForNextInput();
    respondWithCard('Guide');
    await waitForNextInput();

    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(1);
  });

  test('should be put on the Tavern mat', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Guide']);
    await waitForNextInput();
    respondWithCard('Guide');
    await waitForNextInput();

    expect(player.playArea.length).toBe(0);
    expect(player.mats.tavern.last().title).toBe('Guide');
  });

  test('should be able to be called at the start of the turn, discarding your hand and drawing 5 cards', async () => {
    setStartingDeck([...Array(30)].map(() => 'Copper'));
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Guide']);
    await waitForNextInput();
    respondWithCard('Guide');

    await skipToNextTurn(player);
    setHand(player, ['Duchy', 'Duchy', 'Duchy', 'Duchy', 'Duchy']);
    await waitForNextInput();
    respondWithFirstCard();
    await waitForNextInput();

    expect(player.hand.length).toBe(5);
    expect(player.hand).toNotHaveSome(c => c.title === 'Duchy');
    expect(player.discardPile).toHaveSome(c => c.title === 'Duchy');
    expect(player.playArea.last().title).toBe('Guide');
    expect(player.mats.tavern.length).toBe(0);
  });

  test('should allow the player to set aside one card', async () => {
    setStartingDeck([...Array(30)].map(() => 'Copper'));
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Duchy', 'Gear']);

    await waitForNextInput();
    respondWithCard('Gear');
    await waitForNextInput();
    respondWithCard('Duchy');
    await waitForNextInput();

    expect(player.hand.length).toBe(5);

    await skipToNextTurn(player);
    await waitForNextInput();

    expect(player.hand.length).toBe(6);
    expect(player.hand).toHaveSome(c => c.title === 'Duchy');
  });

  test('should allow the player to set aside no cards, in which case it does not stay in play', async () => {
    setStartingDeck([...Array(30)].map(() => 'Copper'));
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Duchy', 'Gear']);

    await waitForNextInput();
    respondWithCard('Gear');
    await waitForNextInput();
    respondWithCards([]);
    await waitForNextInput();

    expect(player.hand.length).toBe(6);

    await skipToNextTurn(player);
    await waitForNextInput();

    expect(player.playArea.length).toBe(0);
    expect(player.hand.length).toBe(5);
  });
};
