import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithSupply, skipToNextTurn, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['DenOfSin'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['DenOfSin']);
    const card = player.hand.last();
    expect(card.types).toHave('Night');
    expect(card.types).toHave('Duration');
    expect(card.types.size).toBe(2);
    expect(card.cost.coin).toBe(5);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should give draw next turn', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Gold', 'Silver']);
    await waitForNextInput();
    respondWithCard('Gold');
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    respondWithSupply('DenOfSin');
    await waitForNextInput();
    respondWithCard('DenOfSin');
    await waitForNextInput();

    await skipToNextTurn(player);
    await waitForNextInput();
    expect(player.playArea.length).toBe(1);
    expect(player.actions).toBe(1);
    expect(player.hand.length).toBe(7);

    await skipToNextTurn(player);
    await waitForNextInput();
    expect(player.playArea.length).toBe(0);
    expect(player.actions).toBe(1);
    expect(player.hand.length).toBe(5);
  });
};
