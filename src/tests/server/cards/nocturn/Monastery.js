import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithSupply, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Monastery'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Monastery']);
    const card = player.hand.last();
    expect(card.types).toHave('Night');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(2);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should trash 2 if gained two', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Workshop', 'Silver', 'Copper', 'Duchy', 'Monastery']);
    await waitForNextInput();
    respondWithCard('Workshop');
    await waitForNextInput();
    respondWithSupply('Silver');
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    respondWithSupply('Estate');
    await waitForNextInput();
    respondWithCard('Monastery');
    await waitForNextInput();
    respondWithCard('Duchy');
    await waitForNextInput();
    expect(game.trash.last().title).toBe('Duchy');
    respondWithCard('Copper');
    await waitForNextInput();
    expect(game.trash.last().title).toBe('Copper');
  });
};
