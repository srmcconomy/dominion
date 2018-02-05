import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithChoice, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Jester', 'Village'];
  });

  test('should curse', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Jester']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setDeck(otherPlayer, ['Estate']);
    await waitForNextInput();
    respondWithCard('Jester');
    await waitForNextInput();
    expect(otherPlayer.discardPile.last().title).toBe('Curse');
    expect(otherPlayer.discardPile.length).toBe(2);
    expect(player.money).toBe(2);
  });

  test('should allow them to gain revealed card', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Jester']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setDeck(otherPlayer, ['Village']);
    await waitForNextInput();
    respondWithCard('Jester');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    expect(otherPlayer.discardPile.last().title).toBe('Village');
    expect(otherPlayer.discardPile.length).toBe(2);
    expect(player.money).toBe(2);
  });

  test('should allow you to gain revealed card', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Jester']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setDeck(otherPlayer, ['Village']);
    await waitForNextInput();
    respondWithCard('Jester');
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    expect(player.discardPile.last().title).toBe('Village');
    expect(otherPlayer.discardPile.length).toBe(1);
    expect(player.money).toBe(2);
  });

  test('should be blocked by Moat', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'FortuneTeller']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper', 'Moat']);
    await waitForNextInput();
    respondWithCard('FortuneTeller');

    let { player: inputPlayer, lastInputWasValid } = await waitForNextInput();
    expect(inputPlayer).toBe(otherPlayer);
    expect(lastInputWasValid).toBe(true);
    respondWithCard('Moat');

    ({ player: inputPlayer, lastInputWasValid } = await waitForNextInput());
    expect(lastInputWasValid).toBe(true);

    expect(otherPlayer.hand.length).toBe(5);
  });
};
