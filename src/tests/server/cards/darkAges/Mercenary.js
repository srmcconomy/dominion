import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithCards, respondWithChoice, respondWithSupply, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Urchin'];
  });

  test('trashing is optional', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Mercenary']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    await waitForNextInput();
    respondWithCard('Mercenary');
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.actions).toBe(0);
    expect(player.buys).toBe(1);
    expect(player.money).toBe(0);
    respondWithCard('Copper');
    await waitForNextInput();
    expect(otherPlayer.hand.length).toBe(5);
  });

  test('trashing 2 does stuff', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Mercenary']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Estate', 'Copper', 'Estate', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithCard('Mercenary');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    respondWithCards(['Copper', 'Copper']);
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.actions).toBe(0);
    expect(player.buys).toBe(1);
    expect(player.money).toBe(2);
    respondWithCards(['Estate', 'Estate']);
    await waitForNextInput();
    expect(otherPlayer.hand.length).toBe(3);
  });

  test('trashing only 1 doesn\'t do stuff ', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Mercenary']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Estate', 'Copper', 'Estate', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithCard('Mercenary');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    respondWithCards(['Copper']);
    await waitForNextInput();
    expect(player.hand.length).toBe(0);
    expect(player.actions).toBe(0);
    expect(player.buys).toBe(1);
    expect(player.money).toBe(0);
    respondWithSupply('Curse');
    await waitForNextInput();
    expect(otherPlayer.hand.length).toBe(5);
  });

  test('should be blocked by Moat', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Mercenary']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper', 'Moat']);
    await waitForNextInput();
    respondWithCard('Mercenary');

    let { player: inputPlayer, lastInputWasValid } = await waitForNextInput();
    expect(inputPlayer).toBe(otherPlayer);
    expect(lastInputWasValid).toBe(true);
    respondWithCard('Moat');

    ({ player: inputPlayer, lastInputWasValid } = await waitForNextInput());
    expect(lastInputWasValid).toBe(true);

    respondWithChoice(0);
    await waitForNextInput();
    respondWithCards(['Copper', 'Copper']);
    await waitForNextInput();

    expect(otherPlayer.hand.length).toBe(5);
  });
};
