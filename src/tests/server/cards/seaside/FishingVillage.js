import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, skipToNextTurn, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['FishingVillage'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['FishingVillage']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types).toHave('Duration');
    expect(card.types.size).toBe(2);
    expect(card.cost.coin).toBe(3);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
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
