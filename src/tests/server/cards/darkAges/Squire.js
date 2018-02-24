import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithCards, respondWithChoice, respondWithSupply, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Squire', 'Militia'];
  });

  test('should give actions', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Squire']);
    await waitForNextInput();
    respondWithCard('Squire');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    expect(player.actions).toBe(2);
    expect(player.buys).toBe(1);
    expect(player.money).toBe(1);
    expect(player.discardPile.length).toBe(0);

  });

  test('should give buys', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Squire']);
    await waitForNextInput();
    respondWithCard('Squire');
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    expect(player.actions).toBe(0);
    expect(player.buys).toBe(3);
    expect(player.money).toBe(1);
    expect(player.discardPile.length).toBe(0);

  });

  test('should give silver', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Squire']);
    await waitForNextInput();
    respondWithCard('Squire');
    await waitForNextInput();
    respondWithChoice(2);
    await waitForNextInput();
    expect(player.actions).toBe(0);
    expect(player.buys).toBe(1);
    expect(player.money).toBe(1);
    expect(player.discardPile.last().title).toBe('Silver');
  });

  test('should gain attack on trash', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Chapel', 'Squire']);
    await waitForNextInput();
    respondWithCard('Chapel');
    await waitForNextInput();
    respondWithCards(['Squire']);
    await waitForNextInput();
    respondWithSupply('Militia');
    await waitForNextInput();
    expect(game.trash.last().title).toBe('Squire');
    expect(player.discardPile.last().title).toBe('Militia');
  });
};
