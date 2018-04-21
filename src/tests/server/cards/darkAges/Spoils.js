import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Spoils'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Spoils']);
    const card = player.hand.last();
    expect(card.types).toHave('Treasure');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(0);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should give $3 and return to supply', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Spoils']);
    await waitForNextInput();
    respondWithCard('Spoils');
    await waitForNextInput();
    expect(player.money).toBe(3);
    expect(player.playArea.length).toBe(0);
    expect(game.supplies.get('Spoils').cards.length).toBe(16);
  });
};
