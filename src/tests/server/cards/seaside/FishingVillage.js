import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, skipToNextTurn, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['FishingVillage'];
  });

  test('should give stuff now and next turn', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'FishingVillage']);
    await waitForNextInput();
    respondWithCard('FishingVillage');
    await waitForNextInput();
    expect(player.actions).toBe(2);
    expect(player.money).toBe(1);
    
    await skipToNextTurn(player);
    await waitForNextInput();
    expect(player.actions).toBe(2);
    expect(player.money).toBe(1);
  });
};
