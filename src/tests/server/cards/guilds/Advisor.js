import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Advisor'];
  });

  test('should draw and opponent discard', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Advisor']);
    setDeck(player, ['Copper', 'Copper', 'Estate', 'Gold', 'Silver']);
    await waitForNextInput();
    respondWithCard('Advisor');
    await waitForNextInput();
    respondWithCard('Gold');
    await waitForNextInput();
    expect(player.hand.length).toBe(6);
    expect(player.actions).toBe(1);
    expect(player.discardPile.last().title).toBe('Gold');
    expect(player.hand.some(c => c.title === 'Silver')).toBe(true);
    expect(player.hand.some(c => c.title === 'Estate')).toBe(true);
  });
};
