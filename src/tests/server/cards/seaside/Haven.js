import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, skipToNextTurn, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Haven'];
  });

  test('should save card for next turn', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Gold', 'Haven']);
    await waitForNextInput();
    respondWithCard('Haven');
    await waitForNextInput();
    respondWithCard('Gold');
    await skipToNextTurn(player);
    await waitForNextInput();

    expect(player.hand.some(c => c.title === 'Gold')).toBe(true);
  });

  test('should be found at end of game', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Province', 'Haven']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithCard('Haven');
    await waitForNextInput();
    respondWithCard('Province');
    await waitForNextInput();
    game.endOfGame();
    expect(player.score).toBe(6);
  });

  test('shouldn\'t stay out if nothing placed on it', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Haven']);
    setDeck(player, []);
    await waitForNextInput();
    respondWithCard('Haven');

    await skipToNextTurn(player);
    await waitForNextInput();
    expect(player.playArea.length).toBe(0);
  });

  test('should work with Throne Room'); // puts two cards on top, both go to hand, both are found at end of game
};
