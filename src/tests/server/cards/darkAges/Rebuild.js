import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithSupply, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Rebuild', 'Mill'];
  });

  test('should filter for non-named card and trash + gain', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Rebuild']);
    setDeck(player, ['Copper', 'Duchy', 'Copper', 'Copper', 'Estate']);
    await waitForNextInput();
    respondWithCard('Rebuild');
    await waitForNextInput();
    respondWithSupply('Estate');
    await waitForNextInput();
    respondWithSupply('Province');
    await waitForNextInput();
    expect(player.discardPile.length).toBe(4);
    expect(player.discardPile.last().title).toBe('Province');
    expect(player.actions).toBe(1);
    expect(game.trash.last().title).toBe('Duchy');
  });

  test('should be fine with split victory types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Rebuild']);
    setDeck(player, ['Copper', 'Harem', 'Copper', 'Copper', 'Mill']);
    await waitForNextInput();
    respondWithCard('Rebuild');
    await waitForNextInput();
    respondWithSupply('Mill');
    await waitForNextInput();
    respondWithSupply('Province');
    await waitForNextInput();
    expect(player.discardPile.length).toBe(4);
    expect(player.discardPile.last().title).toBe('Province');
    expect(player.actions).toBe(1);
    expect(game.trash.last().title).toBe('Harem');
  });

  test('should be fine if finds nothing', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Silver', 'Copper', 'Copper', 'Rebuild']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithCard('Rebuild');
    await waitForNextInput();
    respondWithSupply('Estate');
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    expect(player.discardPile.length).toBe(5);
    expect(player.actions).toBe(1);
    expect(game.trash.length).toBe(0);
    expect(player.money).toBe(2);
  });
};
