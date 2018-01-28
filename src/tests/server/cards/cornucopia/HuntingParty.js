import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, setDiscardPile, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['HuntingParty'];
  });

  test('should draw different card', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'HuntingParty']);
    setDeck(player, ['Estate', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithCard('HuntingParty');
    await waitForNextInput();
    expect(player.hand.length).toBe(6);
    expect(player.actions).toBe(1);
    expect(player.hand.last().title).toBe('Estate');
  });

  test('should draw from discardPile if needed', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'HuntingParty']);
    setDeck(player, ['Copper', 'Copper', 'Copper']);
    setDiscardPile(player, ['Silver']);
    await waitForNextInput();
    respondWithCard('HuntingParty');
    await waitForNextInput();
    expect(player.hand.length).toBe(6);
    expect(player.actions).toBe(1);
    expect(player.hand.last().title).toBe('Silver');
    expect(player.discardPile.length).toBe(2);
  });

  test('should consider drawn card when tutoring', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'HuntingParty']);
    setDeck(player, ['Gold', 'Silver', 'Silver']);
    setDiscardPile(player, ['Silver']);
    await waitForNextInput();
    respondWithCard('HuntingParty');
    await waitForNextInput();
    expect(player.hand.length).toBe(6);
    expect(player.actions).toBe(1);
    expect(player.hand.last().title).toBe('Gold');
  });
};
