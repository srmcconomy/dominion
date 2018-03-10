import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithCards, respondWithNoCards, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Ambassador', 'Spoils'];
  });

  test('Can return cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Estate', 'Estate', 'Ambassador']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    await waitForNextInput();
    respondWithCard('Ambassador');
    await waitForNextInput();
    respondWithCard('Estate');
    await waitForNextInput();
    respondWithCards(['Estate', 'Estate']);
    await waitForNextInput();
    expect(player.hand.length).toBe(2);
    expect(otherPlayer.discardPile.last().title).toBe('Estate');
    expect(game.supplies.get('Estate').cards.length).toBe(9);
  });

  test('Can return none', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Estate', 'Estate', 'Ambassador']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    await waitForNextInput();
    respondWithCard('Ambassador');
    await waitForNextInput();
    respondWithCard('Estate');
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(otherPlayer.discardPile.last().title).toBe('Estate');
    expect(game.supplies.get('Estate').cards.length).toBe(7);
  });

  test('Works with shelters', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Hovel', 'Ambassador']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    await waitForNextInput();
    respondWithCard('Ambassador');
    await waitForNextInput();
    respondWithCard('Hovel');
    await waitForNextInput();
    respondWithCards(['Hovel']);
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(otherPlayer.discardPile.length).toBe(0);
  });

  test('Works with spoils', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Spoils', 'Ambassador']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    await waitForNextInput();
    respondWithCard('Ambassador');
    await waitForNextInput();
    respondWithCard('Spoils');
    await waitForNextInput();
    respondWithCards(['Spoils']);
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(otherPlayer.discardPile.length).toBe(0);
    expect(game.supplies.get('Spoils').cards.length).toBe(15);
  });

  test('Can return to Split piles');

  test('should be blocked by Moat', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Estate', 'Estate', 'Ambassador']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper', 'Moat']);
    await waitForNextInput();
    respondWithCard('Ambassador');

    let { player: inputPlayer, lastInputWasValid } = await waitForNextInput();
    expect(inputPlayer).toBe(otherPlayer);
    expect(lastInputWasValid).toBe(true);
    respondWithCard('Moat');

    ({ player: inputPlayer, lastInputWasValid } = await waitForNextInput());
    expect(lastInputWasValid).toBe(true);

    respondWithCard('Estate');
    await waitForNextInput();
    respondWithCards(['Estate', 'Estate']);
    await waitForNextInput();
    expect(game.supplies.get('Estate').cards.length).toBe(10);
  });
};
