import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithCards, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Cultist'];
  });

  test('draws and dispenses ruins', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Cultist']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    await waitForNextInput();
    respondWithCard('Cultist');
    await waitForNextInput();
    expect(player.actions).toBe(0);
    expect(player.hand.length).toBe(6);
    expect(otherPlayer.discardPile.last().types.has('Ruins')).toBe(true);
  });

  test('can be chained', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Cultist', 'Copper', 'Cultist', 'Copper', 'Cultist']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Copper', 'Copper']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    await waitForNextInput();
    respondWithCard('Cultist');
    await waitForNextInput();
    respondWithCard('Cultist');
    await waitForNextInput();
    respondWithCard('Cultist');
    await waitForNextInput();
    expect(player.actions).toBe(0);
    expect(player.hand.length).toBe(8);
    expect(otherPlayer.discardPile.filter(c => c.types.has('Ruins')).length).toBe(3);
  });

  test('can be trashed for 3 cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Chapel', 'Cultist']);
    await waitForNextInput();
    respondWithCard('Chapel');
    await waitForNextInput();
    respondWithCards(['Cultist']);
    await waitForNextInput();
    expect(player.hand.length).toBe(6);
  });

  test('should be blocked by Moat', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Cultist']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper', 'Moat']);
    await waitForNextInput();
    respondWithCard('Cultist');

    let { player: inputPlayer, lastInputWasValid } = await waitForNextInput();
    expect(inputPlayer).toBe(otherPlayer);
    expect(lastInputWasValid).toBe(true);
    respondWithCard('Moat');

    ({ player: inputPlayer, lastInputWasValid } = await waitForNextInput());
    expect(lastInputWasValid).toBe(true);

    expect(otherPlayer.discardPile.length).toBe(0);
  });
};
