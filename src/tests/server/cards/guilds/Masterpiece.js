import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithSupply, respondWithChoice, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Masterpiece'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Masterpiece']);
    const card = player.hand.last();
    expect(card.types).toHave('Treasure');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(3);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should give $1', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Masterpiece']);
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    respondWithCard('Masterpiece');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    expect(player.money).toBe(3);
  });

  test('overpay should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Estate', 'Gold', 'Gold', 'Estate']);
    await waitForNextInput();
    respondWithCard('Gold');
    await waitForNextInput();
    respondWithCard('Gold');
    await waitForNextInput();
    respondWithSupply('Masterpiece');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    expect(player.discardPile.filter(c => c.title === 'Masterpiece').length).toBe(1);
    expect(player.discardPile.filter(c => c.title === 'Silver').length).toBe(2);
  });
};
