import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, setDiscardPile, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['FarmingVillage'];
  });

  test('should draw an action card', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'FarmingVillage']);
    setDeck(player, ['Village', 'Estate']);
    await waitForNextInput();
    respondWithCard('FarmingVillage');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(2);
    expect(player.hand.last().title).toBe('Village');
    expect(player.discardPile.length).toBe(1);
  });

  test('should draw a treasure card', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'FarmingVillage']);
    setDeck(player, ['Silver', 'Estate']);
    await waitForNextInput();
    respondWithCard('FarmingVillage');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(2);
    expect(player.hand.last().title).toBe('Silver');
    expect(player.discardPile.length).toBe(1);
  });

  test('should draw from discard pile', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'FarmingVillage']);
    setDeck(player, ['Estate', 'Estate']);
    setDiscardPile(player, ['Smithy']);
    await waitForNextInput();
    respondWithCard('FarmingVillage');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(2);
    expect(player.hand.last().title).toBe('Smithy');
    expect(player.discardPile.length).toBe(2);
  });

  test('shouldn\'t draw with nothing to draw', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'FarmingVillage']);
    setDeck(player, ['Estate', 'Estate']);
    setDiscardPile(player, ['Duchy']);
    await waitForNextInput();
    respondWithCard('FarmingVillage');
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.actions).toBe(2);
    expect(player.discardPile.length).toBe(3);
  });
};
