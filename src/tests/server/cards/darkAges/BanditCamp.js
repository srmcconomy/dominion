import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['BanditCamp'];
  });

  test('village, gains spoils', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'BanditCamp']);
    await waitForNextInput();
    respondWithCard('BanditCamp');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(2);
    expect(player.discardPile.last().title).toBe('Spoils');
    expect(game.supplies.get('Spoils').cards.length).toBe(14);
  });

  test('should create Spoils Supply', async () => {
    await startGameGetPlayerAndWaitForStartOfTurn(game);
    expect(game.supplies.get('Spoils').cards.length).toBe(15);
  });
};