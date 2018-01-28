import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['CouncilRoom'];
  });

  test('should draw 4, give buy, give other palyer 1 draw', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'CouncilRoom']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    await waitForNextInput();
    respondWithCard('CouncilRoom');
    await waitForNextInput();
    expect(player.hand.length).toBe(8);
    expect(player.buys).toBe(2);
    expect(otherPlayer.hand.length).toBe(6);
  });
};
