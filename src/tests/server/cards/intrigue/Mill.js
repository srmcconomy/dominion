import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithCards, respondWithChoice, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Mill'];
  });

  test('should cantrip', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Mill']);
    await waitForNextInput();
    respondWithCard('Mill');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(1);
  });

  test('should allow discard for money', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Mill']);
    await waitForNextInput();
    respondWithCard('Mill');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    respondWithCards(['Copper', 'Copper']);
    await waitForNextInput();
    expect(player.hand.length).toBe(3);
    expect(player.actions).toBe(1);
    expect(player.money).toBe(2);
    expect(player.discardPile.length).toBe(2);
  });

  test('need to discard to get money', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Mill']);
    setDeck(player, ['Copper']);
    await waitForNextInput();
    respondWithCard('Mill');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    respondWithCards(['Copper']);
    await waitForNextInput();
    expect(player.hand.length).toBe(0);
    expect(player.actions).toBe(1);
    expect(player.money).toBe(0);
    expect(player.discardPile.length).toBe(1);
  });

  test('should be worth one VP at end of game', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Mill']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    await waitForNextInput();
    game.endOfGame();
    expect(player.score).toBe(1);
  });
};
