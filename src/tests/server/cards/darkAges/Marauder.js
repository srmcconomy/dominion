import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Marauder'];
  });

  test('should gain spoils and give ruins', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Marauder']);
    await waitForNextInput();
    respondWithCard('Marauder');
    await waitForNextInput();
    expect(game.supplies.get('Ruins').cards.length).toBe(9);
    expect(game.supplies.get('Spoils').cards.length).toBe(14);
  });

  test('should create Spoils and Ruins Supplys', async () => {
    await startGameGetPlayerAndWaitForStartOfTurn(game);
    expect(game.supplies.get('Ruins').cards.length).toBe(10);
    expect(game.supplies.get('Spoils').cards.length).toBe(15);
  });

  test('should be blocked by Moat', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Marauder']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper', 'Moat']);
    await waitForNextInput();
    respondWithCard('Marauder');

    let { player: inputPlayer, lastInputWasValid } = await waitForNextInput();
    expect(inputPlayer).toBe(otherPlayer);
    expect(lastInputWasValid).toBe(true);
    respondWithCard('Moat');

    ({ player: inputPlayer, lastInputWasValid } = await waitForNextInput());
    expect(lastInputWasValid).toBe(true);

    expect(otherPlayer.discardPile.length).toBe(0);
  });
};
