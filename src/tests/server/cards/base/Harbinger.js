import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithFirstCard, setDiscardPile, respondWithCardFromHand, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
  });

  test('should have 1 action and 5 cards after playing', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Harbinger']);
    await waitForNextInput();
    respondWithCardFromHand('Harbinger');
    await waitForNextInput();
    expect(player.actions).toBe(1);
    expect(player.hand.length).toBe(5);
  });

  test('should topDeck a card from discardPile', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Harbinger']);
    setDiscardPile(player, ['Gold']);
    await waitForNextInput();
    respondWithCardFromHand('Harbinger');
    await waitForNextInput();
    respondWithFirstCard();
    await waitForNextInput();
    expect(player.deck.last().title).toBe('Gold');
    expect(player.discardPile.length).toBe(0);
  });
};
