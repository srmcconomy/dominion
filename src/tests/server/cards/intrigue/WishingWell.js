import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithSupply, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['WishingWell'];
  });

  test('should not draw if named wrong', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'WishingWell']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Gold', 'Silver']);
    await waitForNextInput();
    respondWithCard('WishingWell');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(1);
    respondWithSupply('Silver');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.deck.last().title).toBe('Gold');
  });

  test('should draw if named correctly', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'WishingWell']);
    setDeck(player, ['Copper', 'Copper', 'Estate', 'Gold', 'Silver']);
    await waitForNextInput();
    respondWithCard('WishingWell');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(1);
    respondWithSupply('Gold');
    await waitForNextInput();
    expect(player.hand.length).toBe(6);
    expect(player.deck.last().title).toBe('Estate');
  });

  test('should be fine with empty deck', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'WishingWell']);
    setDeck(player, []);
    await waitForNextInput();
    respondWithCard('WishingWell');
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.actions).toBe(1);
    respondWithSupply('Gold');
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
  });
};
