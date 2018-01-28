import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithSupply, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Village', 'Remake'];
  });

  test('should trash and gain twice', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Estate', 'Silver', 'Copper', 'Remake']);
    await waitForNextInput();
    respondWithCard('Remake');
    await waitForNextInput();
    respondWithCard('Estate');
    await waitForNextInput();
    respondWithSupply('Village');
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    respondWithSupply('Remake');
    await waitForNextInput();
    expect(player.hand.length).toBe(2);
    expect(player.discardPile.some(c => c.title === 'Village')).toBe(true);
    expect(player.discardPile.last().title).toBe('Remake');
    expect(game.supplies.get('Village').cards.length).toBe(9);
    expect(game.supplies.get('Remake').cards.length).toBe(9);
  });

  test('should fail to gain if there isn\'t something exactly one more', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Estate', 'Copper', 'Copper', 'Remake']);
    await waitForNextInput();
    respondWithCard('Remake');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    expect(player.hand.length).toBe(1);
    expect(player.money).toBe(1);
  });
};
