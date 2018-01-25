import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithSupply, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Remodel'];
  });

  test('should remodel Estate to Remodel', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Estate', 'Remodel']);
    await waitForNextInput();
    respondWithCard('Remodel');
    await waitForNextInput();
    respondWithCard('Estate');
    await waitForNextInput();
    respondWithSupply('Remodel');
    let { player: inputPlayer, lastInputWasValid } = await waitForNextInput();
    expect(lastInputWasValid).toBe(true);
    expect(player.discardPile.last().title).toBe('Remodel');
    expect(game.supplies.get('Remodel').cards.length).toBe(9);
    expect(game.trash.last().title).toBe('Estate');
  });

  test('shouldn\'t remodel Estate to Duchy', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Estate', 'Remodel']);
    await waitForNextInput();
    respondWithCard('Remodel');
    await waitForNextInput();
    respondWithCard('Estate');
    await waitForNextInput();
    respondWithSupply('Duchy');
    let { player: inputPlayer, lastInputWasValid } = await waitForNextInput();
    expect(lastInputWasValid).toBe(false);
    expect(player.discardPile.length).toBe(0);
    expect(game.supplies.get('Duchy').cards.length).toBe(8);
    expect(game.trash.last().title).toBe('Estate');
  });

  test('shouldn\'t gain from empty supply', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    game.supplies.get('Remodel').cards.clear();
    setHand(player, ['Copper', 'Copper', 'Copper', 'Estate', 'Remodel']);
    await waitForNextInput();
    respondWithCard('Remodel');
    await waitForNextInput();
    respondWithCard('Estate');
    await waitForNextInput();
    respondWithSupply('Remodel');
    let { player: inputPlayer, lastInputWasValid } = await waitForNextInput();
    expect(lastInputWasValid).toBe(false);
    expect(player.discardPile.length).toBe(0);
    expect(game.supplies.get('Remodel').cards.length).toBe(0);
    expect(game.trash.last().title).toBe('Estate');
  });

  test('shouldn\'t gain Potion cost cards from normal cards');

  test('shouldn\'t gain Debt cost cards from normal cards');

  test('should be able to gain potion cards from trashing other potion cards');

  test('should be able to gain debt cards from trashing other debt cards');
};
