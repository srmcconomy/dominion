import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithCards, respondWithChoice, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['HuntingGrounds'];
  });

  test('should draw', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'HuntingGrounds']);
    await waitForNextInput();
    respondWithCard('HuntingGrounds');
    await waitForNextInput();
    expect(player.hand.length).toBe(8);
    expect(player.actions).toBe(0);
    expect(player.buys).toBe(1);
    expect(player.money).toBe(0);
  });

  test('should trash for Duchy', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Chapel', 'HuntingGrounds']);
    await waitForNextInput();
    respondWithCard('Chapel');
    await waitForNextInput();
    respondWithCards(['HuntingGrounds']);
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    expect(player.discardPile.last().title).toBe('Duchy');
    expect(player.discardPile.length).toBe(1);
  });

  test('should trash for Estates', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Chapel', 'HuntingGrounds']);
    await waitForNextInput();
    respondWithCard('Chapel');
    await waitForNextInput();
    respondWithCards(['HuntingGrounds']);
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    expect(player.discardPile.filter(c => c.title === 'Estate').length).toBe(3);
    expect(player.discardPile.length).toBe(3);
  });
};
