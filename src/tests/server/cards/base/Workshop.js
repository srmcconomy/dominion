import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithSupply, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Workshop'];
  });

  test('should gain 4 cost cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Workshop']);
    await waitForNextInput();
    respondWithCard('Workshop');
    await waitForNextInput();
    respondWithSupply('Workshop');
    const { player: inputPlayer, lastInputWasValid } = await waitForNextInput();
    expect(lastInputWasValid).toBe(true);
    expect(player.discardPile.last().title).toBe('Workshop');
    expect(game.supplies.get('Workshop').cards.length).toBe(9);
  });

  test('shouldn\'t gain 5 cost cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Workshop']);
    await waitForNextInput();
    respondWithCard('Workshop');
    await waitForNextInput();
    respondWithSupply('Duchy');
    const { player: inputPlayer, lastInputWasValid } = await waitForNextInput();
    expect(lastInputWasValid).toBe(false);
    expect(player.discardPile.length).toBe(0);
  });

  test('shouldn\'t gain from an empty supply', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    game.supplies.get('Workshop').cards.clear();
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Workshop']);
    await waitForNextInput();
    respondWithCard('Workshop');
    await waitForNextInput();
    respondWithSupply('Workshop');
    const { player: inputPlayer, lastInputWasValid } = await waitForNextInput();
    expect(lastInputWasValid).toBe(false);
    expect(player.discardPile.length).toBe(0);
    expect(game.supplies.get('Workshop').cards.length).toBe(0);
  });

  test('shouldn\'t gain Potion cost cards');

  test('shouldn\'t gain Debt cost cards');
};
