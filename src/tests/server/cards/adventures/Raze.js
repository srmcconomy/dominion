import { test, beforeEach, expect, log } from '../../testingFramework';
import { createGame, setHand, respondWithFirstCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput, respondWithCard, respondWithCards, respondWithChoice, skipToNextTurn } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
  });

  test('should give 1 action', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Raze']);
    await waitForNextInput();
    respondWithCard('Raze');
    await waitForNextInput();
    expect(player.actions).toBe(1);
  });

  test('should give the option of trashing itself to look at the top 2 cards of the deck', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Raze']);
    await waitForNextInput();
    respondWithCard('Raze');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    respondWithFirstCard();
    await waitForNextInput();

    expect(game.trash.last().title).toBe('Raze');
    expect(player.hand.length).toBe(5);
    expect(player.deck.length).toBe(3);
    expect(player.discardPile.length).toBe(1);
  });

  test('should give the option of trashing another card to look at the top X cards of the deck', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Raze']);
    await waitForNextInput();
    respondWithCard('Raze');
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();

    expect(game.trash.last().title).toBe('Copper');
    expect(player.hand.length).toBe(3);
    expect(player.deck.length).toBe(5);
    expect(player.discardPile.length).toBe(0);
  });
};
