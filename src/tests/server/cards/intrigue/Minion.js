import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithChoice, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Minion'];
  });

  test('should give $2', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Minion']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    await waitForNextInput();
    respondWithCard('Minion');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(otherPlayer.hand.length).toBe(5);
    expect(player.actions).toBe(1);
    expect(player.money).toBe(2);
  });

  test('should attack', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Minion']);
    setDeck(player, ['Copper', 'Silver', 'Silver', 'Silver', 'Silver']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    await waitForNextInput();
    respondWithCard('Minion');
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.hand.filter(c => c.title === 'Silver').length).toBe(4);
    expect(otherPlayer.hand.length).toBe(4);
    expect(player.actions).toBe(1);
    expect(player.money).toBe(0);
  });

  test('should be blocked by Moat', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Minion']);
    setDeck(player, ['Copper', 'Silver', 'Silver', 'Silver', 'Silver']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper', 'Moat']);
    await waitForNextInput();
    respondWithCard('Minion');

    let { player: inputPlayer, lastInputWasValid } = await waitForNextInput();
    expect(inputPlayer).toBe(otherPlayer);
    expect(lastInputWasValid).toBe(true);
    respondWithCard('Moat');

    ({ player: inputPlayer, lastInputWasValid } = await waitForNextInput());
    expect(lastInputWasValid).toBe(true);

    expect(otherPlayer.hand.length).toBe(5);

    respondWithChoice(1);
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.hand.filter(c => c.title === 'Silver').length).toBe(4);
    expect(otherPlayer.hand.length).toBe(5);
    expect(player.actions).toBe(1);
    expect(player.money).toBe(0);
  });
};
